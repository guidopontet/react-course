import { Route, Routes } from "react-router-dom"

import { DcScreen } from "../components/dc/DcScreen"
import { HeroScreen } from "../components/hero/HeroScreen"
import { MarvelScreen } from "../components/marvel/MarvelScreen"
import { Navbar } from "../components/ui/Navbar"
import { SearchScreen } from "../components/search/SearchScreen"

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />

      <div className="mx-5 my-2">
        <Routes>
          <Route path="marvel" element={<MarvelScreen />} />
          <Route path="dc" element={<DcScreen />} />
          <Route path="search" element={<SearchScreen />} />
          <Route path="hero/:id" element={<HeroScreen />} />

          <Route path="/" element={<MarvelScreen />} />
        </Routes>
      </div>
    </>
  )
}
