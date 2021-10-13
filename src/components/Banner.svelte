<script>
    import {patient} from "../stores/AppStore";    

    const close = () => {        
        patient.set(null);
    }

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
</script>

<div class="patient">
    <img alt="gender-symbol" src="./images/{$patient.gender}.svg"/>
    <div class="patient-name">{$patient.fullName}</div>
    <ul class="patient-data">
        <li class="patient-data-birthDate">{$patient.birthDate}</li>
        <li class="patient-data-age">{$patient.age()} years</li>
        <li class="patient-data-gender">{capitalize($patient.gender)}</li>
    </ul>
    <button class="patient-close-button" on:click={close}>X</button>
</div>

<style>
    .patient {
        display: grid;    
        grid-template-columns: 40px auto 40px;
        grid-template-rows: 2.2rem 1.5rem;    
        background-color: var(--lighter-gray);    
        margin: 0;
        padding: 0 0 0 5px;
        height: 60px;
    }

    .patient div,
    .patient ul {
        background-color: var(--lighter-gray);    
        text-align: left;
        padding: 0;
        margin: 0;
    }

    .patient li {    
        list-style-position: inside;    
        float: left;
    }

    .patient-close-button {
        color:var(--dark-blue);    
        font-weight: bold;
        font-size: 2rem;
        cursor: pointer;
        margin: 0;
        padding: 0;
        background: transparent;
        border: none;
        grid-column: 3;
        grid-row: 1 / span 2;
    }
    .patient-close-button:hover {
        color: var(--blue);
    }

    .patient-close-button:focus {
        outline: none;
    }
    

    .patient img {         
        margin: 12px 0;
        grid-column: 1;
        grid-row: 1 / span 2;    
        height: 46px;
    }

    .patient-name {
        font-size: 1.6rem;   
        color:var(--dark-blue);    
        grid-row: 1;
        grid-column: 2;
        margin: 2px 0 5px 0;
    }

    .patient-data {
        grid-row: 2;
        grid-column: 2;
    }

    .patient-data-birthDate{    
        list-style-type: none;
    }

    .patient-data-age {    
        font-weight: bold;    
        padding: 0 0 0 15px;    
    }

    .patient-data-gender {    
        padding: 0 0 0 15px;
    }
</style>