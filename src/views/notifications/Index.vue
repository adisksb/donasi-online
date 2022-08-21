<template>
    <div>
        <div>
            {{ notifications }}
        </div>
    </div>
</template>

<script>
import Pusher from "pusher-js";

export default {
    name : 'notifications',

    data() {
        return {
            notifications : ''
        }
    },

    methods: {
        getNotifications() {
            // Pusher.logToConsole = true;
            var pusher = new Pusher('b2044044d0e6e45b86ef', {
                cluster: 'ap1'
            });

            var channel = pusher.subscribe('campaign');
                channel.bind('App\\Events\\CampaignStoreEvent', function(data) {
                    console.log('data campaign', data.campaign.title);
                    this.notifications = data.campaign.title ;
                    console.log('this.notifications', this.notifications);
            });
        }
    },

    created() {
        this.getNotifications();
    }
}
</script>
