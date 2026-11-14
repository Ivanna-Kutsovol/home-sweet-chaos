"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { questions } from "../lib/questions";

const Room = dynamic(() => import("../components/Room"), {
    ssr: false,
    loading: () => <div className="loading">Собираем дом…</div>,
});
type Saved = {
    step: number;
    answers: string[];
    started: boolean;
};
const initial: Saved = {
    step: 0,
    answers: [],
    started: false,
};
export default function Home() {
    const [game, setGame] = useState<Saved>(initial);
    const [ready, setReady] = useState(false);
    const [reset, setReset] = useState(0);
    useEffect(() => {
        try {
            const raw = localStorage.getItem("loki-home-v1");
        if (raw) {
            const s = JSON.parse(raw);
        if (
            Number.isInteger(s.step) &&
            s.step >= 0 &&
            s.step <= questions.length &&
            Array.isArray(s.answers) &&
            s.answers.length <= questions.length &&
            s.answers.every((a: unknown) => typeof a === "string") &&
            typeof s.started === "boolean" &&
            s.answers.length >= s.step &&
            s.answers.length <= s.step + 1
        )
            setGame(s);
        }
        } catch {}
    setReady(true);
    }, []);
    useEffect(() => {
        if (ready)
        try {
            localStorage.setItem("loki-home-v1", JSON.stringify(game));
        } catch {}
    }, [game, ready]);
    
    const done = game.step >= questions.length;
    const q = questions[game.step];
    const chosen = game.answers.length > game.step;
    const count = game.answers.length;
    const lokiMessage = !game.started
        ? "Место для вас есть. Для меня — везде."
        : done
            ? "Все дома. Вот это я понимаю."
            : q.loki;
    const choose = (answer: string) => {
        if (!chosen) setGame({ ...game, answers: [...game.answers, answer] });
    };
    const restart = () => {
        setGame({ ...initial, started: false });
        setReset((r) => r + 1);
    };
        if (!ready) {
            return <main />;
        }
    return (
    <main>
        <header>
            <a className="brand" href="/">
            ДОМ, МИЛЫЙ ХАОС<span>ЮЛЯ · РАДИОН · ЛОКИ</span>
            </a>
        <span className="edition">НОВОСЕЛЬЕ / SPECIAL EDITION</span>
        </header>
        <div className="scene">
            <Room count={count} reset={reset} />
        </div>
        {!game.started ? (
        <section className="intro">
            <div className="eyebrow">МАЛЕНЬКАЯ ИГРА ПРО БОЛЬШОЕ «МЫ»</div>
            <h1> Здесь будет
            <br />
            <em>хорошо.</em>
            </h1>
            <p> Стены уже есть. Осталось добавить ваши привычки,
                <br className="desktop" /> любимые вечера и немного милого хаоса.
            </p>
            <button className="primary" onClick={() => setGame({ ...game, started: true })}>
                Обживаемся <span>↗</span>
            </button>
            <small>{questions.length} вопросов · один телефон · вся компания</small>
        </section>
        ) : done ? (
        <section className="final">
            <div className="eyebrow">УЮТ СОБРАН / {questions.length} ИЗ {questions.length}</div>
            <h1> Теперь это
            <br />
            <em>ваш дом.</em>
            </h1>
            <p> Юля и Радион, пусть здесь будет много обычных счастливых дней. И
            всегда найдётся место друг для друга.</p>
            <div className="traditions">
                {[2, 4, 7].map((i) => (
                    <span key={i}>{game.answers[i]}</span>
                ))}
            </div>
            <button className="secondary" onClick={restart}> Обжить заново ↻</button>
            <small>С новосельем. Одобрено Локи ♡</small>
        </section>
        ) : (
        <section className="question" key={game.step}>
            <div className="eyebrow"> ОБЖИВАЕМСЯ / {String(game.step + 1).padStart(2, "0")}
            {" "}ИЗ {String(questions.length).padStart(2, "0")}
            </div>
            <h2>{q.title}</h2>
            <div className="answers">
            {q.options.map((answer, i) => (
                <button
                    key={answer}
                    disabled={chosen}
                    className={
                        chosen && game.answers[game.step] === answer
                        ? "answer selected"
                        : "answer"
                    }
                    onClick={() => choose(answer)}>
                    <span className="answer-index">0{i + 1}</span>
                    {answer}
                    <span className="arrow">
                        {chosen && game.answers[game.step] === answer ? "✓" : "↗"}
                    </span>
                </button>
            ))}
            </div>
            <div className="question-bottom" aria-live="polite">
            {chosen ? (
                <>
                    <span>В доме появился {q.item}</span>
                    <button className="next" onClick={() => setGame({ ...game, step: game.step + 1 })}>
                        {game.step === questions.length - 1 ? "Наш дом" : "Дальше"} →
                    </button>
                </>
            ) : (
                <>
                    <span>Обсудите вслух и выберите вместе</span>
                    <button className="skip" onClick={() => choose(q.options[0])}> Пропустить ↗</button>
                </>
            )}
            </div>
        </section>
        )}
        <aside className="loki">
        <div className="speech" role="status" aria-live="polite" aria-atomic="true">
            <div className="speech-content" key={lokiMessage}>
                <b>ЛОКИ НА СВЯЗИ 🐾</b>
                <p>{lokiMessage}</p>
            </div>
        </div>
        <div
            key={lokiMessage}
            className="dog"
            role="img"
            aria-label="Условная иллюстрация Локи, джек-рассел"
        >
            <i className="ear left" />
            <i className="ear right" />
            <div className="dog-head">
            <i className="patch" />
            <i className="eye left" />
            <i className="eye right" />
            <i className="nose" />
            <i className="muzzle" />
            </div>
            <div className="dog-body" />
            <div className="collar" />
        </div>
        </aside>
        <footer>
            <div className="progress">
                <span>УЮТ</span>
                {questions.map((_, i) => (
                    <i className={i < count ? "filled" : ""} key={i} />
                ))}
                <span>{count}/{questions.length}</span>
            </div>
            <div className="view-controls">
                <span>Потяни, чтобы рассмотреть</span>
                <button onClick={() => setReset((r) => r + 1)} aria-label="Вернуть исходный ракурс">
                    ↺ Ракурс
                </button>
            </div>
        </footer>
    </main>
    );
}
