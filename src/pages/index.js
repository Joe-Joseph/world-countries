import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout/Layout'
import SearchInput from '../components/Layout/SearchInput/SearchInput'
import CountriesTable from '../components/Layout/CountriesTable/CountriesTable'
export default function Home({countries}) {
  const [keyWord, setKeyWord] = useState('')

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyWord) ||
      country.region.toLowerCase().includes(keyWord) ||
      country.subregion.toLowerCase().includes(keyWord))

  const onInputChange = (e) => {
    e.preventDefault()

    setKeyWord(e.target.value.toLowerCase())
  }
  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>
          Found {countries.length} countries
        </div>
        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by Name, Region or Sub Region"
            onChange={onInputChange}
          />
        </div>
        
      </div>
      

      
      <CountriesTable countries={filteredCountries}/>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    }
  }
}
 