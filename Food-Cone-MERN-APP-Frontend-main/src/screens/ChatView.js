import React from 'react'
import ChatApp from '../components/ChatApp'
import Navbar from '../components/Navbar'

export default function ChatView() {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <ChatApp />
            </div>

        </div>
    )
}
