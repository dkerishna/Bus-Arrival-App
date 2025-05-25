document.getElementById('showArrivalsBtn').addEventListener('click', async () => {
    const busStopId = document.getElementById('busStopId').value.trim();
    const resultDiv = document.getElementById('result');
  
    if (!busStopId) {
      resultDiv.innerHTML = "<p>Please enter a Bus Stop ID.</p>";
      return;
    }
  
    resultDiv.innerHTML = "<p>Loading...</p>";
  
    try {
      const response = await fetch(`https://sg-bus-arrivals.vercel.app/?id=${busStopId}`);
      const data = await response.json();

      console.log(data.services);
  
      if (!data.services || data.services.length === 0) {
        resultDiv.innerHTML = "<p>No arrival information available for this Bus Stop ID.</p>";
        return;
      }
  
      let tableHTML = `
        <table>
          <thead>
            <tr>
              <th>Bus No.</th>
              <th>Operator</th>
              <th>Next Arrival (min)</th>
            </tr>
          </thead>
          <tbody>
      `;
  
      data.services.forEach(service => {
        tableHTML += `
          <tr>
            <td>${service.bus_no}</td>
            <td>${service.operator}</td>
            <td>${service.next_bus_mins <= 0
              ? 'Arrived'
              : service.next_bus_mins === 1
              ? 'Arriving'
              : service.next_bus_mins + ' min'}</td>
          </tr>
        `;
      });
  
      tableHTML += `</tbody></table>`;
      resultDiv.innerHTML = tableHTML;
    } catch (error) {
      console.error(error);
      resultDiv.innerHTML = "<p>Error fetching data. Please try again.</p>";
    }
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('busStopId').value = '';
    document.getElementById('result').innerHTML = '';
  });