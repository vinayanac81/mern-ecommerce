import React from 'react'
import Header from '../../Components/Admin/Header'

const Sales = () => {
  return (
    <div>
    <div x-data="setup()" class="{ 'dark': isDark }">
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        <Header/>
        <LeftLayout active="products" />
      </div>
    </div>
  </div>
  )
}

export default Sales