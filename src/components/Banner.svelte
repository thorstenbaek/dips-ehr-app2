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
    <div class="icon {$patient.gender}"/>
    <div class="patient-name">{$patient.fullName}</div>
    <ul class="patient-data">
        <li class="patient-data-ssn">{$patient.ssn}</li>
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
        background-color: #e6e6e6;    
        margin: 0;
        padding: 0 0 0 5px;
        height: 60px;
    }

    .patient div,
    .patient ul {
        background-color: #e6e6e6;    
        text-align: left;
        padding: 0;
        margin: 0;
    }

    .patient li {    
        list-style-position: inside;    
        float: left;
    }

    .patient-close-button {
        color:#15576b;    
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
        color: #1fa7b2;
    }

    .patient-close-button:focus {
        outline: none;
    }

    .female {
        background: url("./images/female.svg");
    }

    .male {
        background: url("./images/male.svg");
    }

    .patient .icon {         
        margin: 12px 0;
        grid-column: 1;
        grid-row: 1 / span 2;    
        height: 46px;
    }

    .patient-name {
        font-size: 1.6rem;   
        color:#15576b;    
        grid-row: 1;
        grid-column: 2;
        margin: 2px 0 5px 0;
    }

    .patient-data {
        grid-row: 2;
        grid-column: 2;
    }

    .patient-data-ssn{    
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