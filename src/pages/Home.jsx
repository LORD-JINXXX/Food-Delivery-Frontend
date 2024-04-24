import React from 'react';
import '../style/home.css';
import { useState } from 'react';
import base_url from '../urls';
import axios from 'axios';

const Home = () => {

    const [formData, setFormData] = useState({
        total_distance: 0
    });
    const [zone, setZone] = useState("central");
    const [organization, setOrganization] = useState(1);
    const [item, setItem] = useState("perishable");
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const data = {
        zone: zone,
        organization_id: Number(organization),
        item_type: item,
        total_distance: Number(formData.total_distance)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {            
            console.log(data);
            const url = `${base_url}/api/calculateDeliveryCost`;
            const response = await axios.post(url,data);
            setResult(response.data.cost);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        
    }


    return (
        <>
            <main>
                <div className='container'>
                    <div className="form">
                        <h1>Calculate the delivery cost</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="itemContainer">
                                <label htmlFor="zone">Zone</label>
                                <select className="zoneSelect" name='zone' value={zone} 
                                        onChange={e => setZone(e.target.value)}>
                                    <option className="option" value="central">Central</option>
                                    <option className="option" value="north">North</option>
                                </select>
                            </div>
                            <div className="itemContainer">
                                <label htmlFor="organization">Organization</label>
                                <select className="zoneSelect" name='organization_id' value={organization} 
                                        onChange={e => setOrganization(e.target.value)}>
                                    <option className="option" value="1">Google</option>
                                    <option className="option" value="2">Microsoft</option>
                                </select>
                            </div>
                            <div className="itemContainer">
                                <label htmlFor="item">Item</label>
                                <select className="zoneSelect" name='item_type' value={item} 
                                        onChange={e => setItem(e.target.value)}>
                                    <option className="option" value="perishable">Perishable</option>
                                    <option className="option" value="non-perishable">Non-Perishable</option>
                                </select>
                            </div>
                            <div className="itemContainer">
                                <label htmlFor="distance">Distance</label>
                                <input 
                                    className="zoneSelect" 
                                    type="number" 
                                    name="total_distance" 
                                    id="distance" 
                                    value={formData.total_distance}
                                    onChange={handleChange}/>
                            </div>
                            <div className="btn">
                                <button type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="result">
                        <h1>Cost: {result} EURO</h1>
                    </div>

                </div>
            </main>
        </>
    )
}

export default Home;
