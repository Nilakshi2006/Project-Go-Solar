(async ()=>{
  const netlify = 'https://project-gosolar.netlify.app';
  try {
    console.log('SIGNUP ->', netlify + '/api/auth/signup');
    let r = await fetch(netlify + '/api/auth/signup', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({name:'CI Test', email:'ci-test+netlify@example.com', password:'pass123'})
    });
    console.log('Status:', r.status);
    let text = await r.text();
    console.log('Body:', text);

    console.log('\nLOGIN ->', netlify + '/api/auth/login');
    r = await fetch(netlify + '/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({email:'ci-test+netlify@example.com', password:'pass123'})
    });
    console.log('Status:', r.status);
    let json;
    try { json = await r.json(); } catch(e) { json = {raw: await r.text()}; }
    console.log('Body:', JSON.stringify(json));

    const token = (json && json.token) || '';
    if (!token) { console.log('No token — skipping quote test'); return; }

    console.log('\nQUOTE ->', netlify + '/api/quote');
    r = await fetch(netlify + '/api/quote', {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({name:'CI Tester', email:'ci@example.com', phone:'123', location:'City', monthlyBill:120})
    });
    console.log('Status:', r.status);
    console.log('Body:', await r.text());

  } catch (err) {
    console.error('Error running tests:', err);
  }
})();
