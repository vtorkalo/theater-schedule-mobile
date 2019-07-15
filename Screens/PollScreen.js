import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Button,
    TextInput,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    ScrollView
} from "react-native";
import DrawerMenucIcon from "../Navigation/DrawerMenuIcon";
import SpinnerButton from 'react-native-spinner-button';
import { BallIndicator } from 'react-native-indicators';
import DrawerMenuIcon from 'TheaterSchedule/Navigation/DrawerMenuIcon';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LocalizeComponent from "../Localization/LocalizedComponent";
import {
    downloadPoll,
    setPollJson,
    sendPoll,
} from "../Actions/PollActions";
import { SimpleSurvey } from "react-native-simple-survey"

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let mySurvey = [];
let sendSurveyJson = {
    "checkBoxes": {},
    "fields": {}
};

class PollScreen extends LocalizeComponent {
    constructor(props) {
        super(props);
        this.state = { isLoaded: false };
    }

    static navigationOptions = ({ screenProps }) => {
        return {
            drawerIcon: (<MaterialCommunityIcons name="poll-box" size={25} />),
            title: screenProps.PollScreenTittle,
        };
    };

    onSend = async () => {
        await this.props.downloadPoll();
    };

    async componentDidMount() {
        await this.onSend();
        await this.setSurveyJson();
    }

    setSurveyJson = () => {
        console.log(this.props.poll);
        for (let elem of this.props.poll.Data.Multiple) {
            let choiseListForMultiple = [];
            for (const choise of elem.choises) {
                choiseListForMultiple.push({ optionText: choise, value: choise });
            }
            let list = {
                questionType: 'MultipleSelectionGroup',
                questionText: elem.title,
                questionId: elem.entry,
                options: choiseListForMultiple,
                questionSettings: {
                    maxMultiSelect: choiseListForMultiple.length,
                    minMultiSelect: 1
                }
            }
            mySurvey.push(list)
        }
        for (let elem of this.props.poll.Data.Single) {
            let list = {
                questionType: 'TextInput',
                questionText: elem.title,
                questionId: elem.entry
            }
            mySurvey.push(list);
        }
        for (let elem of this.props.poll.Data.Radio) {
            let choiseListForRadio = [];
            for (const choise of elem.choises) {
                choiseListForRadio.push({ optionText: choise, value: choise });
            }
            let list = {
                questionType: 'SelectionGroup',
                questionText: elem.title,
                questionId: elem.entry,
                options: choiseListForRadio
            }
            mySurvey.push(list);
        }
        this.setState({ isLoaded: true });
    }

    onSurveyFinished(answers) {
        const infoQuestionsRemoved = [...answers];
        const answersAsObj = {};
        for (let elem of infoQuestionsRemoved) { answersAsObj[elem.questionId] = elem.value; }
        for (let elem of infoQuestionsRemoved) {
            if (typeof elem.value === 'string' || elem instanceof String) {
                sendSurveyJson.fields[elem.questionId] = elem.value;
            } else if (Array.isArray(elem.value)) {
                let choiseListForMultiple = [];
                for (choise of elem.value) {
                    choiseListForMultiple.push(choise.value)
                }
                sendSurveyJson.checkBoxes[elem.questionId] = choiseListForMultiple;
            }
            else {
                let choiseListForRadio = [];
                choiseListForRadio.push(elem.value.value);
                sendSurveyJson.checkBoxes[elem.questionId] = choiseListForRadio;
            }
        }
        this.props.sendPoll(JSON.stringify(sendSurveyJson));
    }

    renderPreviousButton(onPress, enabled) {
        return (
            <View style={styles.renderButtons}>
                <Button
                    style={styles.buttonStyle}
                    color='rgba(141,196,63,1)'
                    backgroundColor='rgba(141,196,63,1)'

                    onPress={onPress}
                    disabled={!enabled}
                    title={'Previous'}
                />
            </View>
        );
    }

    renderNextButton(onPress, enabled) {
        return (
            <View style={styles.renderButtons}>
                <Button
                    style={styles.buttonStyle}
                    color='rgba(141,196,63,1)'
                    backgroundColor='rgba(141,196,63,1)'
                    onPress={onPress}
                    disabled={!enabled}
                    title={'Next'}
                />
            </View>
        );
    }

    renderFinishedButton(onPress, enabled) {
        return (
            <View style={styles.renderButtons}>
                <SpinnerButton
                    buttonStyle={styles.buttonStyle}
                    isLoading={this.props.poll.isSending}
                    indicatorCount={4}
                    size={7}
                    spinnerType='DotIndicator'
                    animationType={'flipInX'}
                    onPress={onPress}>
                    <Text style={styles.buttonText}>Finish</Text>
                </SpinnerButton>
            </View>
        );
    }

    renderButton(data, index, isSelected, onPress) {
        return (
            <View
                key={`selection_button_view_${index}`}
                style={styles.renderChoiseButtons}
            >
                <TouchableOpacity
                    style={{
                        borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10,
                        backgroundColor: isSelected ? '#1abc9c' : '#7154b8', height: 0.06 * deviceHeight, alignItems: 'center', justifyContent: 'center',
                        fontSize: 20,
                    }}
                    onPress={onPress}
                    key={`button_${index}`}
                >
                    <Text style={{ color: 'white' }}>{data.optionText}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderQuestionText(questionText) {
        return (
            <View style={styles.renderQuestionText}>
                <Text numLines={1} style={styles.questionText}>{questionText}</Text>
            </View>
        );
    }

    renderTextBox(onChange, placeholder, value) {
        return (
            <View>
                <TextInput
                    style={styles.textBox}
                    onChangeText={text => onChange(text)}
                    numberOfLines={3}
                    underlineColorAndroid={'white'}
                    placeholder={placeholder}
                    placeholderTextColor={'rgba(184,184,184,1)'}
                    value={value}
                    multiline
                    blurOnSubmit
                    returnKeyType='done'
                />
            </View>
        );
    }

    renderInfoText(infoText) {
        return (
            <View style={{ marginLeft: 10, marginRight: 10 }}>
                <Text style={styles.infoText}>{infoText}</Text>
            </View>
        );
    }

    render() {
        if (!this.state.isLoaded)
            return (
                <View style={{ flex: 1 }}>
                    <DrawerMenuIcon
                        onPressMenuIcon={() => this.props.navigation.openDrawer()}
                        text={this.t('pollScreenHeader')} />
                    <View style={styles.contentContainer}>
                        <View style={styles.indicator}>
                            <BallIndicator color="#aaa" />
                        </View>
                    </View>
                </View>
            )
        else {
            return (
                <View style={{ flex: 1 }}>
                    <View >
                        <DrawerMenucIcon
                            onPressMenuIcon={() => this.props.navigation.openDrawer()}
                            text={this.t('pollScreenHeader')} />
                    </View>
                    {this.props.poll.isSend === false ? (
                        <ScrollView>
                            <View style={styles.background}>
                                <KeyboardAvoidingView
                                    behavior={Platform.OS === "ios" ? "padding" : null}
                                    keyboardVerticalOffset={Platform.OS === "ios" ? 150 : 0}>
                                    <View style={styles.container}>
                                        <SimpleSurvey
                                            survey={mySurvey}
                                            renderSelector={this.renderButton.bind(this)}
                                            containerStyle={styles.surveyContainer}
                                            selectionGroupContainerStyle={styles.selectionGroupContainer}
                                            navButtonContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
                                            renderPrevious={this.renderPreviousButton.bind(this)}
                                            renderNext={this.renderNextButton.bind(this)}
                                            renderFinished={this.renderFinishedButton.bind(this)}
                                            renderQuestionText={this.renderQuestionText}
                                            onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
                                            renderTextInput={this.renderTextBox}
                                            renderInfo={this.renderInfoText}
                                        />
                                    </View>
                                </KeyboardAvoidingView>
                            </View>
                        </ScrollView>
                    ) : (
                            <View style={{ flex: 1, alignItems: 'center',
                            justifyContent: 'center', backgroundColor:'#BFD0D670'   }}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.textTitle}>Thank you for response!</Text>
                                </View>
                                <UniformButton
                  text={this.t("Go Home")}
                  style={styles.button}
                  onPress={()=>this.props.navigation.navigate("Schedule")}
                />
                            </View>
                        )}
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 5,
        backgroundColor: '#BFD0D670',
        alignItems: 'center'
    },
    button: {
        alignSelf: "center",
        margin: 20,
        width: "65%",
        justifyContent: 'center',
        marginTop: 8
      },
    container: {
        minWidth: '70%',
        maxWidth: '90%',
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 20,
        borderRadius: 10,
    },
    surveyContainer: {
        width: 0.85 * deviceWidth,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignContent: 'center',
        padding: 5,
    },
    selectionGroupContainer: {
        flexDirection: 'column',
        backgroundColor: 'white',
        alignContent: 'flex-end',
    },
    indicator: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        zIndex: 10,
        alignSelf: 'center'
    },
    background: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BFD0D670',
        height: 0.9 * deviceHeight
    },
    questionText: {
        marginBottom: 20,
        fontSize: 20,
    },
    textBox: {
        borderWidth: 1,
        borderColor: 'rgba(204,204,204,1)',
        backgroundColor: 'white',
        borderRadius: 10,

        padding: 10,
        textAlignVertical: 'top',
        marginLeft: 10,
        marginRight: 10
    },
    textContainer: {
        marginLeft: 10,
        marginRight: 10,
    },
    textTitle: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10,
    },
    infoText: {
        marginBottom: 20,
        fontSize: 20,
        marginLeft: 10
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
    buttonStyle: {
        height: 0.06 * deviceHeight,
        width: 0.3 * deviceWidth,
        borderRadius: 10
    },
    renderButtons:{
        flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10
    },
    renderChoiseButtons:{
        marginTop: 5, marginBottom: 5, justifyContent: 'flex-start', marginHorizontal: 0.09 * deviceWidth 
    },
    renderQuestionText:{
        marginLeft: 10, marginRight: 10, alignItems: 'center'
    }
});


const mapStateToProps = (state) => ({
    poll: state.poll,
    languageCode: state.settings.settings.languageCode,
    deviceId: state.settings.deviceId,
})

const mapDispatchToProps = dispatch => {
    return {
        downloadPoll: () => dispatch(downloadPoll()),
        setPollJson: (data) => dispatch(setPollJson(data)),
        sendPoll: (data) => dispatch(sendPoll(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollScreen);

