export const getCookie = (name) => {
  const cookies = document.cookie.split(' ').map((cookie) => {
    const index = cookie.indexOf('=');
    if (index < 0) return { name: '', value: null };

    const name = cookie.slice(0, index);
    let value = cookie.slice(index + 1);
    value = value.endsWith(';') ? value.slice(0, -1) : value;
    return { name, value };
  });
  const cookie = cookies.find((cookie) => cookie.name === name);

  return cookie ? cookie.value : null;
};
