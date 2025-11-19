import { useState } from 'react'
import Button from '../components/common/Button'


function StartPage({ onStart }) {
    const [diskCount, setDiskCount] = useState(3);
    return (
        <main>
            <section>
                <h2>Початок гри</h2>
                <p>Налаштуйте гру: оберіть кількість дисків і натисніть "Розпочати".</p>
                <div className="start-controls">
                    <label>
                        Дисків:
                        <input
                            aria-label="disk-count"
                            type="number"
                            min={3}
                            max={8}
                            value={diskCount}
                            onChange={(e) => setDiskCount(Math.max(3, Math.min(8, Number(e.target.value || 3))))}
                        />
                    </label>
                    <Button onClick={() => onStart(diskCount)}>Розпочати</Button>
                </div>
                <div className="start-info">
                    Це каркас — тут є тільки робоча логіка переміщення дисків. Компоненти й стан готові для підключення.
                </div>
            </section>
        </main>
    );
}

export default StartPage;