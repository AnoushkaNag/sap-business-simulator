export function showToast(message: string, duration = 2500){
  if (typeof window === 'undefined') return
  const id = 'toast-' + Math.random().toString(36).slice(2,9)
  const el = document.createElement('div')
  el.id = id
  el.className = 'fixed right-6 top-6 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50'
  el.style.transition = 'opacity .3s ease, transform .3s ease'
  el.style.opacity = '1'
  el.style.transform = 'translateY(0)'
  el.textContent = message
  document.body.appendChild(el)
  setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(-8px)' }, duration)
  setTimeout(() => { el.remove() }, duration + 320)
}

export function showError(message: string, duration = 3000){
  showToast(message, duration)
}
