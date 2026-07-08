(async ()=>{
  const render = 'https://gosolar-backend-07a7.onrender.com';
  try {
    console.log('LOGIN ->', render + '/api/auth/login');
    let r = await fetch(render + '/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({email:'ci-test+netlify@example.com', password:'pass123'})
    });
    console.log('Status:', r.status);
    let text;
    try { text = await r.text(); console.log('Body:', text); }
    catch(e){ console.error('Error reading body', e); }

  } catch (err) {
    console.error('Error running render tests:', err);
  }
})();
