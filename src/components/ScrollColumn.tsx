import './ScrollColumn.css' // we'll create this next
import { Title } from './Title'

type Props = {
    items: object[]
    direction?: 'up' | 'down'
}

export const ScrollColumn = ({ items, direction = 'down' }: Props) => {
    const isUp = direction === 'up'
    const animationClass = isUp ? 'scroll-up' : 'scroll-down'

    return (
        <div className="scroll-container">
            <div className={`scroll-content ${animationClass}`}>
                {[...items, ...items].map((item: any, index) => (
                    <Title movie={item} full={false} />
                ))}
            </div>
        </div>
    )
}