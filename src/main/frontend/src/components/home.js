import { Card } from 'primereact/card';
import { ListBox } from 'primereact/listbox';

export default function Home(props) {
    const tecnologies = [
        {name: 'Spring boot 2.5.6(backend)'},
        {name: 'Java 8'},
        {name: 'React(frontend)'},
        {name: 'OpenApi 3.0 for the api rest'},
        {name: 'Prime React(React UI component library)'}
    ];
    return (
        <div>
            <Card title={props.mensaje} style={{ width: '50rem', marginBottom: '2em' }}>
                <p className="p-m-0" style={{ lineHeight: '1.5' }}>
                Project using react and Spring boot to carry out a crud to manage information about the European leagues.
                The purpose of this project is to create a website
                capable of saving interesting data about the leagues and thus being able to carry out a statistical study of these.</p>
            </Card>
            <div className="text-3xl text-800 font-bold mb-4">Technologies</div>
            <ListBox optionLabel="name" value={tecnologies} options={tecnologies}/>
        </div>
    );
}
