const formatDate = (date) => {
    if (!date) return null;

    return new Date(date).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Kolkata"
    });
};

export { formatDate };