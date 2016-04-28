import React from 'react';
import OneSignal from 'onesignal';

export default class SubscribeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPushNotificationsSupported: false,
            isEnabled: false
        };
    }

    subscribe() {
        OneSignal.push(() => {
            OneSignal.registerForPushNotifications();
        });
    }

    componentDidMount() {
        OneSignal.push(() => {
            if (!OneSignal.isPushNotificationsSupported()) {
                return;
            }
            OneSignal.isPushNotificationsEnabled((isEnabled) => {
                this.setState({
                    isPushNotificationsSupported: true,
                    isEnabled: isEnabled
                });
            });
            OneSignal.push(() => {
                OneSignal.on('subscriptionChange', (isSubscribed) => {
                    this.setState({
                        isEnabled: isSubscribed
                    });
                });
            });
        });
    }

    render() {
        if (!this.state.isPushNotificationsSupported) {
            return (<p>Push notification are not supported by your browser!</p>);
        }
        if (this.state.isEnabled) {
            return (<p>Push notification are enabled!</p>);
        }
        return (<button onclick={this.subscribe}>Subscribe</button>);
    }
}
