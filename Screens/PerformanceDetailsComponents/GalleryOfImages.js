import React from 'react';
import ImageGallery from './ImageGallery';
import LocalizedComponent from '../../Localization/LocalizedComponent';
import ImageLoad from 'react-native-image-placeholder';
import { Card, CardItem, Left, Body, Thumbnail } from 'native-base';
import { ScrollView, StyleSheet, FlatList } from 'react-native';
import Text from '../Components/CustomText';

class GalleryOfImages extends LocalizedComponent {

  render()
  {
    return (
                this.props.performance.galleryImage == null ? <Text style={[styles.textContainer, styles.textSubtitle]}>
                {this.t("The performance galary is not available")}</Text> : 
                           <ImageGallery images={this.props.performance.galleryImage} galleryTitle={this.t("Performance Image Gallery: ")}
                keyExtractor={(item) => item.uri}
                showImage={({ item }) =>
                    <View style={styles.cardContainer}>
                        <Card style={styles.card}>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={require("TheaterSchedule/img/logo.png")} />
                                    <Body>
                                        <Text style={{ fontSize: 18 }}>{this.props.performance.title}</Text>
                                        <Text note style={{ fontStyle: 'italic' }}>{this.t("Lviv Puppet Theater")}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <ImageLoad
                                    source={{ uri: `${item}` }}
                                    style={styles.galleryImage}
                                    placeholderSource={require("TheaterSchedule/img/logo.png")}
                                    placeholderStyle={styles.placeholderStyle}
                                />
                            </CardItem>
                            <CardItem>
                            </CardItem>
                        </Card>
                    </View>
                }
            />  );
  }
}

export default GalleryOfImages

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
    textSubtitle: {
      fontWeight: "bold",
      color: "gray",
      marginBottom: 5
  }
})