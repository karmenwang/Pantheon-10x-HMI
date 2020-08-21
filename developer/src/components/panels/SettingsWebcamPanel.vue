<script>
'use strict'

import { mapState, mapMutations } from 'vuex'

export default {
	computed: {
		...mapState(['settings']),
		flipItems() {
			return [
				{ text: this.$t('panel.settingsWebcam.flipNone'), value: 'none' },
				{ text: this.$t('panel.settingsWebcam.flipX'), value: 'x' },
				{ text: this.$t('panel.settingsWebcam.flipY'), value: 'y' },
				{ text: this.$t('panel.settingsWebcam.flipBoth'), value: 'both' }
			];
		},
		webcamURL: {
			get() { return this.settings.webcam.url; },
			set(value) { this.update({ webcam: { url: value } }); }
		},
		webcamUpdateInterval: {
			get() { return this.settings.webcam.updateInterval; },
			set(value) { if (this.isNumber(value) && value >= 250) { this.update({ webcam: { updateInterval: value } }); } }
		},
		webcamLiveURL: {
			get() { return this.settings.webcam.liveUrl; },
			set(value) { this.update({ webcam: { liveUrl: value } }); }
		},
		webcamFix: {
			get() { return this.settings.webcam.useFix; },
			set(value) { this.update({ webcam: { useFix: value } }); }
		},
		webcamEmbedded: {
			get() { return this.settings.webcam.embedded; },
			set(value) { this.update({ webcam: { embedded: value } }); }
		},
		webcamRotation: {
			get() { return this.settings.webcam.rotation; },
			set(value) { this.update({ webcam: { rotation: value } }); }
		},
		webcamFlip: {
			get() { return this.settings.webcam.flip; },
			set(value) { this.update({ webcam: { flip: value } }); }
		}
	},
	data() {
		return {
			rotationItems: [
				{ text: '0°', value: 0 },
				{ text: '90°', value: 90 },
				{ text: '180°', value: 180 },
				{ text: '270°', value: 270 }
			]
		}
	},
	methods: mapMutations('settings', ['update'])
}
</script>
