'use strict'

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css'
import './components'

import App from './App.vue'
import plugins from './plugins'
import i18n from './i18n'
import router from './routes'
import store from './store'

Vue.config.productionTip = false

Vue.use(plugins)
Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	i18n,
	render: h => h(App),
	router,
	store,
	vuetify: new Vuetify({
		icons: {
			iconfont: 'mdiSvg',
		},
		lang: { t: (key, ...params) => i18n.t(key, params) },
		theme: { 
			dark: false,
			themes: {
				dark: {
					primary: '#faa72b', 		//Pantheon orange
					secondary: '#00adb5',		//Pantheon teal
					accent: '#fdcd99',			//Pantheon peach
					error: '#dd4437',			//red
					success: '#53d3A3',			//Teal Green
					warning: '#F68A22',			//Pantheon darker orange
					info: '#00B4C6'				//Pantheon lighter teal		
				},
				light: {
					primary: '#00adb5',
					secondary: '#faa72b',
					accent: '#fdcd99',
					error: '#dd4437',
					success: '#4CAF50',	
					warning: '#FBC02D',
					info: '#00BEE9'					
				},
			},
		},
	})
})
