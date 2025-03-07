import { MessageSquare } from "lucide-react";

export default function NochatSelected(){
    return (
        <div className='w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50'>
            <div className="max-w-md text-center space-y-6">
                <div className="flex justify-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
                        <MessageSquare className="w-8 h-8 text-primary"></MessageSquare>
                    </div>
                </div>
                    <h1 className="text-2xl font-bold">Welcome to Chatty</h1>
                    <p className="text-base-center/60">Select a user to start chatting</p>
            </div>
        </div>
    )
}