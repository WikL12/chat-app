import { useThemeStore } from '../store/useThemeStore'
export default function Theme() {
    const allThemes = ['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter', 'dim', 'nord', 'sunset']
    const { theme, setTheme } = useThemeStore()
    return (
        <div className='flex flex-col items-center justify-center h-full'>
            <div className='flex  gap-4 w-100 flex-wrap ' >
                {allThemes.map((t) => (
                    <div key={t} className='flex items-center gap-2'>
                        <button  onClick={() => setTheme(t)} className={`${theme === t ? 'bg-primary text-primary-content' : ''}`}>{t}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}