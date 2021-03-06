
export const filterGalleryLogic = async (
  filters, countries, filteredCountries, setFilteredCountries, setPage
) => {
  let lastPage
  if (filters.hasChanged) {
    let filteredArray
    switch (filters.hasChanged) {
      // si es uno de los filtros el que ha cambiado
      case "filterByName":
      case "filterByActivity":
      case "filterByContinent": {

        filteredArray = letFilter(countries, filters)
        filteredArray = letOrder(filteredArray, filters)
        break;
      }
      case "orderByPopulation":
      case "orderByName": {
        filteredArray = letOrder(filteredCountries, filters)

        break;
      }
      default: break;
    }
    setFilteredCountries(filteredArray)
    lastPage = Math.ceil(filteredArray.length / 9)
  }
  else {
    setFilteredCountries(countries)
    lastPage = Math.ceil(countries.length / 9)
  }
  setPage({ currentPage: 1, lastPage, slicedNumber: 0 })

}

// function to filter countries list
function letFilter(countries, filters) {

  // regex list
  const expName = new RegExp(filters.filterByName, 'i')
  const expContinent = new RegExp(filters.filterByContinent, 'i')
  // const expActivity = new RegExp(, 'i')
  console.log(filters.filterByActivity)
  /**
   * 
   */
  const newData = countries.filter(data => (
      expContinent.test(data.continent) &&
      data.activities.some(filters.filterByActivity) &&
      (expName.test(data.name) || expName.test(data.id) || data.activities.find(activity => expName.test(activity.name)))
    )
  )
  return newData
}

// function to order countries list
function letOrder(filteredArray, filters) {
  if (filters.orderByName !== '') {
    filteredArray.sort((a, b) => {
      return filters.orderByName === 'asc'
        ? b.name.localeCompare(a.name)
        : filters.orderByName === 'des'
        && a.name.localeCompare(b.name)
    })
  }
  if (filters.orderByPopulation !== '') {
    filteredArray.sort((a, b) => {
      return filters.orderByPopulation === 'des'
        ? a.population - b.population
        : filters.orderByPopulation === 'asc'
        && b.population - a.population
    })
  }
  return filteredArray
}
