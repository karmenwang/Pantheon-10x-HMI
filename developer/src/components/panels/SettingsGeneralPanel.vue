
<script>
'use strict'

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import { localStorageSupported } from '../../utils/localStorage.js'

export default {
	computed: {
		...mapState(['settings']),
		...mapGetters(['uiFrozen']),
		supportsLocalStorage() { return localStorageSupported; },
		darkTheme: {
			get() { return this.settings.darkTheme; },
			set(value) { this.update({ darkTheme: value }); }
		},
		settingsStorageLocal: {
			get() { return this.settings.settingsStorageLocal; },
			set(value) { this.update({ settingsStorageLocal: value }); }
		},
		settingsSaveDelay: {
			get() { return this.settings.settingsSaveDelay; },
			set(value) { if (this.isNumber(value) && value >= 0) { this.update({ settingsSaveDelay: value }); } }
		},
		cacheStorageLocal: {
			get() { return this.settings.cacheStorageLocal; },
			set(value) { this.update({ cacheStorageLocal: value }); }
		},
		cacheSaveDelay: {
			get() { return this.settings.cacheSaveDelay; },
			set(value) { if (this.isNumber(value) && value >= 0) { this.update({ cacheSaveDelay: value }); } }
		}
	},
	data() {
		return {
			showResetConfirmation: false
		}
	},
	methods: {
		...mapActions('settings', ['reset']),
		...mapMutations('settings', ['update'])
	}
}
</script>
