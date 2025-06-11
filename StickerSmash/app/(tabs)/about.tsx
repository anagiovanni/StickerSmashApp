import { StyleSheet, Text, View, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function AboutScreen() {
  const openLink = (url: string): void => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/emoji1.png')} // Substitua pelo caminho do seu logo
          style={styles.logo}
        />
        <Text style={styles.title}>Sobre o Nosso App</Text>
      </View>

      {/* Seção Sobre o App */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>O Que Fazemos</Text>
        <Text style={styles.sectionText}>
          Nosso aplicativo foi desenvolvido para simplificar sua vida, oferecendo soluções inovadoras 
          para problemas cotidianos. Combinamos tecnologia de ponta com design intuitivo para criar 
          uma experiência excepcional para nossos usuários.
        </Text>
      </View>

      {/* Recursos Principais */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recursos Principais</Text>
        <View style={styles.featureItem}>
          <Ionicons name="flash" size={24} color="#4E8AF4" />
          <Text style={styles.featureText}>Desempenho ultrarrápido e eficiente</Text>
        </View>
        <View style={styles.featureItem}>
          <MaterialIcons name="security" size={24} color="#4E8AF4" />
          <Text style={styles.featureText}>Segurança de dados de primeira linha</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="sync-circle" size={24} color="#4E8AF4" />
          <Text style={styles.featureText}>Sincronização em tempo real entre dispositivos</Text>
        </View>
        <View style={styles.featureItem}>
          <FontAwesome name="heart" size={24} color="#4E8AF4" />
          <Text style={styles.featureText}>Desenvolvido com paixão e atenção aos detalhes</Text>
        </View>
      </View>

      {/* Equipe de Desenvolvimento */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nossa Equipe</Text>
        <Text style={styles.sectionText}>
          Somos um grupo diversificado de desenvolvedores, designers e especialistas em UX dedicados 
          a criar produtos excepcionais que fazem a diferença na vida das pessoas.
        </Text>
        
        <View style={styles.teamContainer}>
          <View style={styles.teamMember}>
            <Image 
              source={require('../../assets/images/emoji1.png')} 
              style={styles.teamImage}
            />
            <Text style={styles.teamName}>João Silva</Text>
            <Text style={styles.teamRole}>Desenvolvedor Sênior</Text>
          </View>
          
          <View style={styles.teamMember}>
            <Image 
              source={require('../../assets/images/emoji1.png')} 
              style={styles.teamImage}
            />
            <Text style={styles.teamName}>Maria Souza</Text>
            <Text style={styles.teamRole}>Designer UX/UI</Text>
          </View>
        </View>
      </View>

      {/* Versão e Atualizações */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Versão do App</Text>
        <Text style={styles.versionText}>2.4.1</Text>
        <Text style={styles.sectionText}>
          Estamos constantemente melhorando nosso aplicativo. Verifique regularmente 
          por atualizações para obter os melhores recursos e correções de bugs.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Verificar Atualizações</Text>
        </TouchableOpacity>
      </View>

      {/* Contato e Links Úteis */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contato & Suporte</Text>
        <TouchableOpacity 
          style={styles.linkItem} 
          onPress={() => openLink('mailto:suporte@nossoapp.com')}
        >
          <Ionicons name="mail" size={20} color="#4E8AF4" />
          <Text style={styles.linkText}>suporte@nossoapp.com</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.linkItem} 
          onPress={() => openLink('https://nossoapp.com')}
        >
          <Ionicons name="globe" size={20} color="#4E8AF4" />
          <Text style={styles.linkText}>nossoapp.com</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.linkItem} 
          onPress={() => openLink('https://twitter.com/nossoapp')}
        >
          <FontAwesome name="twitter" size={20} color="#4E8AF4" />
          <Text style={styles.linkText}>@nossoapp</Text>
        </TouchableOpacity>
        
        <Text style={[styles.sectionText, { marginTop: 20 }]}>
          Sua opinião é importante para nós! Envie seus comentários e sugestões.
        </Text>
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2023 Nosso App. Todos os direitos reservados.</Text>
      </View>
    </ScrollView>
  );
}

type Styles = {
  container: any;
  contentContainer: any;
  header: any;
  logo: any;
  title: any;
  section: any;
  sectionTitle: any;
  sectionText: any;
  featureItem: any;
  featureText: any;
  teamContainer: any;
  teamMember: any;
  teamImage: any;
  teamName: any;
  teamRole: any;
  versionText: any;
  button: any;
  buttonText: any;
  linkItem: any;
  linkText: any;
  footer: any;
  footerText: any;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f4f4',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#B9DDDE',
    borderRadius: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  sectionText: {
    fontSize: 16,
    color: '#000',
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
  teamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  teamMember: {
    alignItems: 'center',
    width: '48%',
  },
  teamImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  teamRole: {
    fontSize: 14,
    color: '#a1a1a1',
  },
  versionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#AD1D3',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4E8AF4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  linkText: {
    fontSize: 16,
    color: '#4E8AF4',
    marginLeft: 10,
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#a1a1a1',
  },
});