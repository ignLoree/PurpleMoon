module.exports = formatResults;

function calculateColor(upvotePercentage, downvotePercentage) {
    if (upvotePercentage === 0) {
        return 'red';
    } else if (downvotePercentage === 0) {
        return 'green';
    } else {
        return 'mixed';
    }
}

function formatResults(upvotes = [], downvotes = []) {
    const totalVotes = upvotes.length + downvotes.length;

    const upvotePercentage = upvotes.length / totalVotes;
    const downvotePercentage = downvotes.length / totalVotes;

    const upPercentage = upvotePercentage * 100 || 0;
    const downPercentage = downvotePercentage * 100 || 0;

    const results = [];
    results.push(
        `<:PM_up:1240578881724088323> ${upvotes.length} voti (${upPercentage.toFixed(1)}%) • <:PM_down:1240578945049694218> ${downvotes.length} voti (${downPercentage.toFixed(1)}%)`
    );

    return results.join('\n');
}

module.exports = formatResults;