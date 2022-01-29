import '../css/app.css'

import Alpine from 'alpinejs'
window.Alpine = Alpine
Alpine.start()

import hljs from 'highlight.js/lib/common'
document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre code').forEach((el) => {
    hljs.highlightElement(el)
  })
})
