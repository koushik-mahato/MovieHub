import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import {
  fetchOnTheAirTVShows,
  fetchAiringTodayTVShows,
  fetchPopularTVShows,
  fetchTopRatedTVShows,
  fetchLatestTVShows,
  fetchTrendingAll,
} from '../services/tmdb'

import PosterCard from '../components/PosterCard'

const categoryConfig = {
  'on-the-air': {
    title: 'On The Air',
    fetcher: fetchOnTheAirTVShows,
  },
  'airing-today': {
    title: 'Airing Today',
    fetcher: fetchAiringTodayTVShows,
  },
  popular: {
    title: 'Popular',
    fetcher: fetchPopularTVShows,
  },
  'top-rated': {
    title: 'Top Rated',
    fetcher: fetchTopRatedTVShows,
  },
  latest: {
    title: 'Latest Releases',
    fetcher: fetchLatestTVShows,
  },
  trending: {
    title: 'Trending',
    fetcher: fetchTrendingAll,
    filter: (i) => i.media_type === 'tv',
  },
}

const TVCategory = () => {
  const { category } = useParams()
  const config = categoryConfig[category]

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!config) return

    const load = async () => {
      try {
        let data = await config.fetcher()
        if (config.filter) data = data.filter(config.filter)
        setItems(data)
      } catch (err) {
        console.error('Error loading TV category:', err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [config])

  if (!config) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl">Unknown TV category: {category}</h2>
        <Link to="/tv" className="text-cyan-400 hover:underline">
          ← Back to TV Shows
        </Link>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-4 text-center">Loading {config.title}…</div>
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {config.title} TV Shows
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((item) => (
          <PosterCard key={item.id} item={item} />
        ))}
      </div>
      <div className="mt-4">
        <Link to="/tv" className="text-cyan-400 hover:underline">
          ← Back to TV Shows
        </Link>
      </div>
    </div>
  )
}

export default TVCategory
