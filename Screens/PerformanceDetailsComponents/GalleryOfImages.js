import React from 'react';
import ImageGallery from './ImageGallery';
import { StyleSheet, View} from 'react-native';
import LocalizedComponent from '../../Localization/LocalizedComponent';
import ImageLoad from 'react-native-image-placeholder';
import { Card, CardItem, Left, Body, Thumbnail } from 'native-base';
import Text from '../Components/CustomText';
import _ from 'lodash';

export default class GalleryOfImages extends LocalizedComponent {

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
            />
             );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  }, 
  galleryImage: {
    height: 200,
    width: null,
    flex: 1,
    resizeMode: 'cover'
  }, 
  cardContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: '#1a1917',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5
  },
  card: {
    minHeight: 300,
    minWidth: 300
  },
    textSubtitle: {
      fontWeight: "bold",
      color: "gray",
      marginBottom: 5
  }
})