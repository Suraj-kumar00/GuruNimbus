function formatMetadata(metadata: any): string {
    let formattedData = `
    Professor's Information:
    - Professor Name: ${metadata.profName || 'N/A'}
    - Number of Ratings: ${metadata.numOfRatings || 'N/A'}
    - Department: ${metadata.profDepartment || 'N/A'}
    - Difficulty: ${metadata.profDifficulty || 'N/A'}
    - Rating Value: ${metadata.profRatingValue || 'N/A'}
    - School: ${metadata.profSchool || 'N/A'}
    - Reviews:
    `;
  
    // Append each review to the formatted string
    if (metadata.profReviews && metadata.profReviews.length > 0) {
      metadata.profReviews.forEach((review: string, index: number) => {
        formattedData += `
        Review ${index + 1}: ${review}`;
      });
    } else {
      formattedData += ' No reviews available.';
    }
  
    return formattedData;
  }
  export { formatMetadata }