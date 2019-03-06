import React from 'react';
import { View, StyleSheet, TouchableOpacity, LayoutAnimation, UIManager,Text } from 'react-native';
import { Container,Content} from 'native-base';
import LocalizedComponent from '../../Localization/LocalizedComponent';

export default class TheaterHistory extends LocalizedComponent {
    constructor(props) {
        super(props);
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        this.state = { readMore: false }
    }

    showDetails = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ readMore: !this.state.readMore });
    }

    render() {
        if (this.state.readMore == false) {
            return (
                <Container>
                    <Content padder >
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{this.t("Building")}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <TouchableOpacity onPress={this.showDetails}>
                                <Text >{this.t("BuildingDescription")}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{this.t("Founders")}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <TouchableOpacity onPress={this.showDetails}>
                                <Text numberOfLines={5} ellipsizeMode="tail">{this.t("FoundersHistory")}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{this.t("Today")}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text>{this.t("TodayHistory")}</Text>
                        </View>
                    </Content>
                </Container>
            );
        }
        else {
            return (
                <Container>
                    <Content padder >
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{this.t("Building")}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <TouchableOpacity onPress={this.showDetails}>
                                <Text numberOfLines={6} ellipsizeMode="tail">{this.t("BuildingDescription")}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{this.t("Founders")}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <TouchableOpacity onPress={this.showDetails}>
                                <Text>{this.t("FoundersHistory")}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{this.t("Today")}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text>{this.t("TodayHistory")}</Text>
                        </View>
                    </Content>
                </Container>
            );
        }
    }
}

const styles = StyleSheet.create({
    textContainer: {
        borderWidth: 1,
        borderColor: '#5b3fa8',
        padding: 5,
        borderRadius: 7,
        marginBottom: 6,
    },
    titleContainer: {
        borderRadius: 12,
        marginBottom: 6,
        alignItems: 'center',
        backgroundColor: '#5b3fa8'
    },
    title:{
        fontSize: 20, 
        color: 'white', 
        fontWeight: '500'
    }
})