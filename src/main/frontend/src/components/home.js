import { Card } from 'primereact/card';

export default function Home(props) {
    return (
        <div>
            <Card title={props.mensaje} style={{ width: '50rem', marginBottom: '2em' }}>
                <p className="p-m-0" style={{ lineHeight: '1.5' }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                    quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </Card>
        </div>
    );
}
