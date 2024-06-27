if(location.href.includes('/admin')){
  const userType = sessionStorage.getItem('userType');
  if(userType !== 'admin'){
    location.href = '/401'
  }
}