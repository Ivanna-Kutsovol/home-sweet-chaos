import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Дом, милый хаос — Юля, Радион и Локи', description: 'Обживаем новый дом вместе. Игра на новоселье.' };
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="ru"><body>{children}</body></html>; }
