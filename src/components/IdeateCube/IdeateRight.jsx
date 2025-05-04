import React, { useState, useEffect } from 'react';
import { ideateRightInfo } from '../../constants/cube_info';

const IdeateRight = ({ onSelectIdea }) => {
    const [currentCategory, setCurrentCategory] = useState('apps');
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);
    const [expandedDetails, setExpandedDetails] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Define categories based on your static data
    const categories = [
        { id: 'apps', name: 'Apps' },
        { id: 'platforms', name: 'Platforms' },
        { id: 'hardware', name: 'Hardware' },
        { id: 'retail', name: 'Retail' },
        { id: 'tools', name: 'Tools' },
    ];

    // Handle initial setup
    useEffect(() => {
        // Get random card initially
        const randomIndex = Math.floor(Math.random() * getCardsForCategory(currentCategory).length);
        setCurrentCardIndex(randomIndex);
    }, [currentCategory]);

    // Get cards for specific category
    const getCardsForCategory = (categoryId) => {
        return ideateRightInfo.filter(card => card.category === categoryId);
    };

    // Get current card
    const getCurrentCard = () => {
        const cards = getCardsForCategory(currentCategory);
        return cards[currentCardIndex] || null;
    };

    // Check if card is in favorites
    const isInFavorites = (card) => {
        return favorites.some(fav => fav.id === card.id);
    };

    // Toggle favorite status
    const toggleFavorite = (card) => {
        if (isInFavorites(card)) {
            setFavorites(favorites.filter(fav => fav.id !== card.id));
        } else {
            setFavorites([...favorites, card]);
            setShowConfirmation(true);
            setTimeout(() => setShowConfirmation(false), 2000);
        }
    };

    // Flip animation handlers
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    // Navigation handlers
    const goToNextCard = () => {
        setFadeIn(false);
        setTimeout(() => {
            const cards = getCardsForCategory(currentCategory);
            const nextIndex = (currentCardIndex + 1) % cards.length;
            setCurrentCardIndex(nextIndex);
            setIsFlipped(false);
            setFadeIn(true);
        }, 300);
    };

    const goToPrevCard = () => {
        setFadeIn(false);
        setTimeout(() => {
            const cards = getCardsForCategory(currentCategory);
            const prevIndex = (currentCardIndex - 1 + cards.length) % cards.length;
            setCurrentCardIndex(prevIndex);
            setIsFlipped(false);
            setFadeIn(true);
        }, 300);
    };

    // Handle category change
    const handleCategoryChange = (categoryId) => {
        setFadeIn(false);
        setTimeout(() => {
            setCurrentCategory(categoryId);
            const cards = getCardsForCategory(categoryId);
            setCurrentCardIndex(Math.floor(Math.random() * cards.length));
            setIsFlipped(false);
            setFadeIn(true);
        }, 300);
    };

    // Handle search functionality
    const handleSearch = () => {
        if (!searchTerm.trim()) return;
        
        const results = ideateRightInfo.filter(card => 
            card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        setSearchResults(results);
    };

    // Handle selecting an idea
    const handleSelect = (card) => {
        if (onSelectIdea && typeof onSelectIdea === 'function') {
            onSelectIdea(card);
        }
        
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 2000);
    };

    // Get a random card
    const getRandomCard = () => {
        // Get a random category
        const randomCategoryIndex = Math.floor(Math.random() * categories.length);
        const randomCategory = categories[randomCategoryIndex].id;
        
        // Then get a random card from that category
        const cardsInCategory = getCardsForCategory(randomCategory);
        const randomCardIndex = Math.floor(Math.random() * cardsInCategory.length);
        
        setFadeIn(false);
        setTimeout(() => {
            setCurrentCategory(randomCategory);
            setCurrentCardIndex(randomCardIndex);
            setIsFlipped(false);
            setFadeIn(true);
        }, 300);
    };

    // Render inspiration card
    const renderCard = () => {
        const currentCard = getCurrentCard();
        if (!currentCard) return null;

        return (
            <div className={`relative w-full max-w-md mx-auto ${fadeIn ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                <div 
                    className="relative w-full aspect-[3/4] transition-all duration-500 transform"
                    style={{ perspective: '1000px' }}
                >
                    {/* Front of Card */}
                    <div 
                        className={`absolute inset-0 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ${
                            isFlipped ? 'opacity-0 rotate-y-180' : 'opacity-100'
                        }`}
                        style={{ 
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5))`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backfaceVisibility: 'hidden',
                            transformStyle: 'preserve-3d'
                        }}
                        onClick={handleFlip}
                    >
                        <div className="absolute inset-0 flex flex-col p-6">
                            <div className="mb-auto">
                                <span className="bg-blue-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                                    {categories.find(cat => cat.id === currentCard.category)?.name}
                                </span>
                            </div>
                            
                            {/* Logo area with white background */}
                            <div className="w-full h-40 bg-white rounded-lg mb-4 flex items-center justify-center">
                                {currentCard.imageUrl ? (
                                    <img 
                                        src={currentCard.imageUrl} 
                                        alt={currentCard.name} 
                                        className="max-h-32 max-w-full object-contain"
                                    />
                                ) : (
                                    <div className="text-gray-400">No Image</div>
                                )}
                            </div>
                            
                            <div className="mt-auto">
                                <h3 className="text-2xl font-bold text-white mb-2">{currentCard.name}</h3>
                                <p className="text-gray-200 mb-4 line-clamp-3">{currentCard.description}</p>
                                
                                <div className="flex justify-between items-center">
                                    <button 
                                        className="px-4 py-1.5 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-white text-sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleFlip();
                                        }}
                                    >
                                        See Details
                                    </button>
                                    
                                    <button
                                        className="p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-70"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(currentCard);
                                        }}
                                    >
                                        <svg 
                                            className="w-5 h-5" 
                                            fill={isInFavorites(currentCard) ? "currentColor" : "none"} 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24" 
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                                                className={isInFavorites(currentCard) ? "text-red-500" : "text-white"}
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Back of Card */}
                    <div 
                        className={`absolute inset-0 bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ${
                            isFlipped ? 'opacity-100 rotate-y-180' : 'opacity-0'
                        }`}
                        style={{ 
                            backfaceVisibility: 'hidden',
                            transformStyle: 'preserve-3d'
                        }}
                        onClick={handleFlip}
                    >
                        <div className="absolute inset-0 flex flex-col p-6 rotate-y-180">
                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-white mb-1">{currentCard.name}</h3>
                                <span className="bg-blue-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                                    {categories.find(cat => cat.id === currentCard.category)?.name}
                                </span>
                            </div>
                            
                            <div className="flex-grow overflow-y-auto">
                                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-1">Key Features</h4>
                                <ul className="list-disc list-inside mb-4 text-gray-200 text-sm">
                                    {currentCard.keyFeatures?.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                                
                                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-1">Why It Works</h4>
                                <p className="text-gray-200 text-sm mb-4">{currentCard.whyItWorks}</p>
                                
                                {currentCard.innovationLessons && (
                                    <>
                                        <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-1">Innovation Lessons</h4>
                                        <p className="text-gray-200 text-sm">{currentCard.innovationLessons}</p>
                                    </>
                                )}
                            </div>
                            
                            <div className="mt-4 flex justify-between items-center">
                                <button 
                                    className="px-4 py-1.5 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-white text-sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleFlip();
                                    }}
                                >
                                    Back to Front
                                </button>
                                
                                {/* Select button with black text and black outline */}
                                <button 
                                    className="px-4 py-1.5 bg-white hover:bg-gray-100 border-2 border-black rounded-lg text-black font-medium text-sm flex items-center"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSelect(currentCard);
                                    }}
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Select
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex justify-between mt-6">
                    <button 
                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full"
                        onClick={goToPrevCard}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    
                    <div className="flex gap-1">
                        {Array.from({ length: Math.min(5, getCardsForCategory(currentCategory).length) }).map((_, index) => (
                            <div 
                                key={index} 
                                className={`w-2 h-2 rounded-full ${
                                    index === currentCardIndex % 5 ? 'bg-blue-500' : 'bg-gray-600'
                                }`}
                            />
                        ))}
                    </div>
                    
                    <button 
                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full"
                        onClick={goToNextCard}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    };

    // Render category tabs
    const renderCategoryTabs = () => (
        <div className="flex justify-center mb-6 overflow-x-auto py-2 px-4 -mx-4">
            <div className="inline-flex bg-gray-800 rounded-lg p-1 shadow-inner">
                {categories.map(category => (
                    <button
                        key={category.id}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                            currentCategory === category.id 
                                ? 'bg-blue-600 text-white' 
                                : 'text-gray-300 hover:text-white hover:bg-gray-700'
                        }`}
                        onClick={() => handleCategoryChange(category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    );

    // Render favorites view
    const renderFavorites = () => (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Saved Inspirations ({favorites.length})</h3>
                <button 
                    className="text-blue-400 hover:text-blue-300 flex items-center text-sm"
                    onClick={() => setShowFavorites(false)}
                >
                    <span className="mr-1">←</span> Back to Browse
                </button>
            </div>
            
            {favorites.length === 0 ? (
                <div className="text-center py-12 bg-gray-800 rounded-lg">
                    <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <p className="text-gray-400">No saved inspirations yet.</p>
                    <p className="text-gray-500 text-sm mt-2">Heart your favorite cards to save them here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {favorites.map(card => (
                        <div 
                            key={card.id} 
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 hover:translate-y-1"
                            onClick={() => {
                                const categoryCards = getCardsForCategory(card.category);
                                const cardIndex = categoryCards.findIndex(c => c.id === card.id);
                                if (cardIndex !== -1) {
                                    setCurrentCategory(card.category);
                                    setCurrentCardIndex(cardIndex);
                                    setShowFavorites(false);
                                }
                            }}
                        >
                            {/* White background for logo in favorites */}
                            <div className="h-24 bg-white flex items-center justify-center">
                                {card.imageUrl ? (
                                    <img 
                                        src={card.imageUrl} 
                                        alt={card.name} 
                                        className="max-h-20 max-w-full object-contain" 
                                    />
                                ) : (
                                    <div className="text-gray-400">No Image</div>
                                )}
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-white font-medium">{card.name}</h4>
                                    <span className="bg-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full text-white">
                                        {categories.find(cat => cat.id === card.category)?.name}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm line-clamp-2">{card.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    // Render search modal
    const renderSearchModal = () => (
        <div className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20 transition-opacity duration-300 ${
            showSearchModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
            <div className="bg-gray-900 rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Search Inspirations</h3>
                    <button 
                        className="text-gray-400 hover:text-white"
                        onClick={() => setShowSearchModal(false)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="flex mb-4">
                    <input
                        type="text" 
                        className="flex-grow bg-gray-800 text-white border border-gray-700 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search by name or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-r-lg flex items-center justify-center"
                        onClick={handleSearch}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
                
                {searchResults.length === 0 ? (
                    searchTerm ? (
                        <div className="text-center py-8">
                            <p className="text-gray-400">No results found for "{searchTerm}"</p>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-400">Start typing to search for inspirations</p>
                        </div>
                    )
                ) : (
                    <div className="divide-y divide-gray-800">
                        {searchResults.map(result => (
                            <div 
                                key={result.id}
                                className="py-3 cursor-pointer hover:bg-gray-800 px-2 rounded flex items-center"
                                onClick={() => {
                                    const categoryCards = getCardsForCategory(result.category);
                                    const cardIndex = categoryCards.findIndex(c => c.id === result.id);
                                    if (cardIndex !== -1) {
                                        setCurrentCategory(result.category);
                                        setCurrentCardIndex(cardIndex);
                                        setShowSearchModal(false);
                                    }
                                }}
                            >
                                {/* White background for logo in search results */}
                                <div className="w-12 h-12 bg-white rounded-md mr-3 flex-shrink-0 flex items-center justify-center">
                                    {result.imageUrl ? (
                                        <img 
                                            src={result.imageUrl} 
                                            alt={result.name} 
                                            className="max-h-10 max-w-10 object-contain" 
                                        />
                                    ) : (
                                        <div className="text-gray-400 text-xs">No Image</div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-white font-medium text-sm">{result.name}</h4>
                                    <p className="text-gray-400 text-xs line-clamp-1">{result.description}</p>
                                    <span className="text-xs text-blue-400">
                                        {categories.find(cat => cat.id === result.category)?.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    // Render main interface
    return (
        <div className="flex flex-col items-center justify-center h-full p-6 relative">
            {/* Confirmation Message */}
            {showConfirmation && (
                <div className="bg-green-600 text-white py-2 px-4 rounded-md mb-4 transition-opacity duration-300 absolute top-4 left-1/2 transform -translate-x-1/2 z-10 shadow-lg">
                    {isInFavorites(getCurrentCard()) ? 'Added to favorites!' : 'Selection confirmed!'}
                </div>
            )}
            
            {/* Main Content */}
            {showFavorites ? (
                renderFavorites()
            ) : (
                <>
                    <h2 className="text-2xl font-bold mb-4 text-center">Inspiration Cards</h2>
                    
                    {/* Category Tabs */}
                    {renderCategoryTabs()}
                    
                    {/* Card Display */}
                    {renderCard()}
                    
                    {/* Action Buttons */}
                    <div className="flex justify-center gap-3 mt-8">
                        <button 
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-md font-medium flex items-center shadow-lg text-white"
                            onClick={getRandomCard}
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Random Inspiration
                        </button>
                        
                        <button 
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md font-medium flex items-center shadow-lg text-white"
                            onClick={() => setShowSearchModal(true)}
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Search
                        </button>
                        
                        <button 
                            className={`px-4 py-2 rounded-md font-medium flex items-center shadow-lg text-white ${
                                favorites.length > 0 
                                ? 'bg-red-600 hover:bg-red-500' 
                                : 'bg-gray-600 cursor-not-allowed'
                            }`}
                            onClick={() => favorites.length > 0 && setShowFavorites(true)}
                            disabled={favorites.length === 0}
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            Favorites ({favorites.length})
                        </button>
                    </div>
                </>
            )}
            
            {/* Search Modal */}
            {renderSearchModal()}
            
            <div className="text-sm text-gray-400 mt-6 text-center">
                <p>Browse through inspiration cards to get ideas from similar products or famous examples</p>
            </div>
        </div>
    );
};

export default IdeateRight;