<style>
.input {
	font-size:1rem;
}

</style>

<template>
	<v-card outlined>
		<v-card-title>
			{{ $t('panel.settingsNotifications.caption') }}
		</v-card-title>

		<v-card-text class="d-flex flex-column">
			<v-switch color ="primary" class="mt-0 mb-3" v-model="notificationErrorsPersistent" :label="$t('panel.settingsNotifications.notificationErrorsPersistent')" hide-details></v-switch>
			<!-- <v-text-field color="secondary" v-model.number="notificationTimeout" type="number" step="any" min="0" :label="$t('panel.settingsNotifications.notificationTimeout', ['ms'])" hide-details></v-text-field> -->
			<v-text-field
				color="secondary" v-model="timeout" type="number" step="any" min="0" 
				:label="$t('panel.settingsNotifications.notificationTimeout', ['ms'])" hide-details @click.stop = "editNotificationTimeout"></v-text-field>
			<!-- <span>{{settings.notifications.timeout}}</span> -->
		</v-card-text>
		<keyboard-dialog :shown.sync ="editNotificationTimeoutDialog.shown" :prompt="$t('dialog.editNotificationTimeout.prompt')" :title="$t('dialog.editNotificationTimeout.title')" is-numeric-value @confirmed="setNotificationTimeout"></keyboard-dialog>
	</v-card>
</template>

<script>
'use strict'

import { mapState, mapMutations } from 'vuex'

export default {
	computed: {
		...mapState(['settings']),
		notificationErrorsPersistent: {
			get() { return this.settings.notifications.errorsPersistent; },
			set(value) { this.update({ notifications: { errorsPersistent: value } }); }
		},
		notificationTimeout: { //not used with virtual numerical keyboard
			get() {return this.settings.notifications.timeout; },
			set(value) { if (this.isNumber(value) && value >= 0) { this.update({ notifications: { timeout: value }}) ;} }
		},
	},
	data() {
		return{
			timeout: 5000,
			editNotificationTimeoutDialog:{
				shown: false
			}
		}
	},
	methods: {
	...mapMutations('settings', ['update']),
		editNotificationTimeout(){
			this.editNotificationTimeoutDialog.shown = true;
		},
		setNotificationTimeout(value){
			this.settings.notifications.timeout = value;
			this.timeout = value;	//number displayed on Notifications text-field is what settings.notifications.timeout is
		}
	}
}
</script>
