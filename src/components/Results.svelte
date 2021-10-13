<script>
    import Patient from "../viewModels/patient";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let results;   
    let patients;

    $: {
        if (results) {
            patients = results.entry.map(p => new Patient(p.resource));
        }
    }

    function selectPatient(patient) {
        dispatch("selectPatient", patient);
    }
</script>

<div class="result-list">
    <table>            
      <thead></thead>
      <tbody>
        {#if patients}        
            {#each patients as patient}            
            <tr class="result-item" on:click={selectPatient(patient)}>
                <td class="result-item-ssn">{patient.ssn}</td>                
                <td class="result-item-family-name">{patient.familyName}</td>
                <td class="result-item-given-name">{patient.givenName}</td>
                <td class="result-item-age">{patient.age()} y</td>
                {#each patient.address as address}
                    <td class="result-item-address">{address.line}, {address.city}, {address.state}</td>
                {/each}
            </tr>                
            {/each}
        {/if}       
      </tbody>
    </table>           
    <div class="result-list-status">Found {patients?.length} patients</div>
</div>

<style>

.result-list {
    background: var(--lighter-gray);
    width: 100%;
    max-width: 800px;
}

.result-list-status {    
    padding: 4px;
    margin: 0px;    
}

.result-item-ssn {
    padding: 4px;
}

.result-item-family-name {
    padding: 4px;
    font-weight: bold;
}

.result-item-given-name {
    padding: 4px;
    font-weight: bold;
}

.result-item-age {
    padding: 4px;
}

.result-item-address {
    padding: 4px;
}
</style>