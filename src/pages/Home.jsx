const searchBuses = async () => {
  if (!from || !to) {
    alert("Please enter From and To locations");
    return;
  }

  setLoading(true);

  try {
    const cleanFrom = from.trim();
    const cleanTo = to.trim();

    const res = await searchBusesApi(
      cleanFrom,
      cleanTo,
      journeyDate
    );

    console.log("API Response:", res.data);

    setBuses(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.log("SEARCH ERROR:", err);
    setBuses([]);
  }

  setLoading(false);
};