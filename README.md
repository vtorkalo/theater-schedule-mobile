# theater-schedule-mobile
React native app for theater
Application will be written using React native

## Coding guidelines

### Adding text

For adding text, you can use {this.t('`TEXT`')}. 

```javascript
 <Text>{this.t('TEXT')}</Text>
```

Every `TEXT` you can find in "./Localized/translations";

```javascript
export const translations = {
    'ua': {
      'TEXT': 'Привіт світ!',
    },
    'en': {
      'TEXT': 'Hello world!',
    },
    'ru': {
      'TEXT': 'Привет мир!',
    },
  }
```

**Don`t use any text with localization in App.js. This will lead to an error
In App.js you can use text without localization**


### Adding new component

For every new component, which  you want to add, you must import LocalizedComponent.
Don`t forget connect yor component with store.

```javascript
// import ...
import { connect } from 'react-redux';
import LocalizedComponent from "./Localized/LocalizedComponent";

class MyComponent extends LocalizedComponent {
  ...
}
...

export default connect(
...
)(MyComponent)
```

### Change Localization

If you want to change your language you must import function `setLanguage` from `redux-i18n`

```javascript
...
import { setLanguage } from "redux-i18n";

class MyComponent extends LocalizedComponent {
    render() {
        return (
            <View>                     
                <Button title="ua" onPress={() => this.props.setLanguage("ua")} />
                <Button title="en" onPress={() => this.props.setLanguage("en")} />
                <Button title="ru" onPress={() => this.props.setLanguage("ru")} />
                              
                <Text>{this.t('TEXT')}</Text>
            </View>
        );
    }
}
const mapDispatchToPros = {
    setLanguage
    ...
};
...
export default connect(
    mapDispatchToPros,
)(MyComponent)
```
