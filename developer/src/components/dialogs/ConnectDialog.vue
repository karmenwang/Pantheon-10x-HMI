<template>
	<v-dialog v-model="shown" persistent width="360">
		<v-card outlined>
			<v-form ref="form" @submit.prevent="submit">
				<v-card-title class="headline">
					{{ $t('dialog.connect.title') }}
				</v-card-title>

				<v-card-text>
					{{ $t('dialog.connect.prompt') }}

					<v-text-field color="secondary" v-show="!mustConnect" v-model="hostname" :autofocus="!mustConnect" :placeholder="$t('dialog.connect.hostPlaceholder')" :rules="[v => !!v || $t('dialog.connect.hostRequired')]" required></v-text-field>
					<v-text-field color = "secondary" ref="password" type="password" :placeholder="$t(passwordRequired ? 'dialog.connect.passwordPlaceholder' : 'dialog.connect.passwordPlaceholderOptional')" v-model="password" :autofocus="mustConnect" :rules="[v => !!v || !passwordRequired || $t('dialog.connect.passwordRequired')]" :required="passwordRequired"></v-text-field>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn large depressed  v-show="!mustConnect" color="primary" text @click="hideConnectDialog">{{ $t('generic.cancel') }}</v-btn>
					<v-btn large depressed  color="primary" text type="submit">{{ $t('dialog.connect.connect') }}</v-btn>
				</v-card-actions>
			</v-form>
		</v-card>
	</v-dialog>
</template>

<script>
'use strict'

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
	computed: {
		...mapState(['isLocal', 'connectDialogShown', 'passwordRequired']),
		...mapState('settings', ['lastHostname']),
		mustConnect() { return !this.isLocal && !this.isConnected; }
	},
	data() {
		return {
			shown: false,
			hostname: location.host,
			password: ''
		}
	},
	methods: {
		...mapActions(['connect']),
		...mapMutations(['showConnectDialog', 'hideConnectDialog']),
		async submit() {
			if (this.shown && this.$refs.form.validate()) {
				this.hideConnectDialog();
				try {
					await this.connect({ hostname: this.hostname, password: this.password });
					this.password = '';
				} catch (e) {
					console.warn(e);
					this.showConnectDialog();
				}
			}
		}
	},
	mounted() {
		if (this.isLocal) {
			this.hostname = this.lastHostname;
		}
		this.shown = this.connectDialogShown;
	},
	watch: {
		connectDialogShown(to) { this.shown = to; },
		lastHostname(to) {
			if (this.isLocal) {
				// Update the hostname
				this.hostname = to;
			}
		}
	}
}
</script>
