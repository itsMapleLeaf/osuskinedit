import * as React from 'react'

export function windowMinimize() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" version="1.1" width="24" height="24" viewBox="0 -6 24 24">
      <path d="M20,14H4V10H20"/>
    </svg>
  )
}

export function windowMaximize() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" version="1.1" width="24" height="24" viewBox="0 0 24 24">
      <path d="M4,4H20V20H4V4M6,8V18H18V8H6Z"/>
    </svg>
  )
}

export function windowUnmaximize() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" version="1.1" width="24" height="24" viewBox="0 0 24 24">
      <path d="M4,8H8V4H20V16H16V20H4V8M16,8V14H18V6H10V8H16M6,12V18H14V12H6Z"/>
    </svg>
  )
}

export function windowClose() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  )
}
