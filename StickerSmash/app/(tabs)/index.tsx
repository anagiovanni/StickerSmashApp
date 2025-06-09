import { useState, useRef } from "react";
import { captureRef } from 'react-native-view-shot';
import { ImageSourcePropType, View, StyleSheet, Platform } from "react-native";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import * as ImagePicker from 'expo-image-picker';
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import { type ImageSource } from "expo-image";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as MediaLibrary from 'expo-media-library';
import domtoimage from 'dom-to-image';
import MovableEmojiSticker from "@/components/MovableEmojiSticker";

const PlaceholderImage = require('@/assets/images/background-image.png')

export default function Index() {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  type EmojiItem = {
    id: string;
    source: ImageSource;
    size: number;
    x: number;
    y: number;
    scale: number;  // novo campo para escala
  };



  const [emojiList, setEmojiList] = useState<EmojiItem[]>([]);
  const imageRef = useRef<View>(null);

  if (status === null) {
    requestPermission();
  }

  const onReset = () => {
    setShowAppOptions(false);
  }

  const onAddSticker = () => {
    setIsModalVisible(true);
  }

  const onModalClose = () => {
    setIsModalVisible(false);
  }

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert('Image salva com sucesso');
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }

  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    }
    else {
      alert("Você não escolheu nenhuma imagem");
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />

          {/* Renderiza todos os emojis adicionados */}
          {emojiList.map((emoji, index) => (
            <MovableEmojiSticker
              key={emoji.id}
              source={emoji.source}
              imageSize={emoji.size}
              x={emoji.x}
              y={emoji.y}
              onDrag={(newX, newY) => {
                setEmojiList(prev => {
                  const updated = [...prev];
                  updated[index] = { ...updated[index], x: newX, y: newY };
                  return updated;
                });
              }}
            />
          ))}

        </View>
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Resetar" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Salvar" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Escolher uma foto"
            theme="primary"
            onPress={pickImageAsync}
          />
          <Button label="Usar essa foto" onPress={() => setShowAppOptions(true)} />
        </View>
      )}

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList
          onSelect={(emoji) => {
            setEmojiList(prev => [
              ...prev,
              {
                id: String(Date.now()),
                source: emoji,
                size: 40,
                x: 0,
                y: 0,
                scale: 1,  // inicia a escala em 1
              },
            ]);
            onModalClose();
          }}
          onCloseModal={onModalClose}
        />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f4f4',
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row'
  }
})