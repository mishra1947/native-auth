import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header, Button, CardSection, Spinner } from './component/common';
import { firebaseConfig } from './component/common/Config'
import LoginForm from './component/LoginForm';

class App extends Component {

    state = { loggedIn: null }

    componentWillMount() {
        const config = firebaseConfig;
        firebase.initializeApp(config);

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true })
            } else {
                this.setState({ loggedIn: false })
            }
        })
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true: return (
                <CardSection>
                    <Button onPress={ () => firebase.auth().signOut()}>
                        Log Out
                    </Button>
                </CardSection>
            );
            case false:
                return <LoginForm />;
            default:
                return (
                    <View style={styles.spinerViewStyle}>
                        <Spinner size='large' />
                    </View>
                );
        }
    }

    render() {
        return (
            <View>
                <Header headerText='Authentication' />
                {this.renderContent()}
            </View>
        );
    };
};

const styles = {
    spinerViewStyle: {
        marginTop: 100,
    }
}

export default App;