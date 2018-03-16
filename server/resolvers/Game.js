module.exports = {
    results: function (parent, args, ctx, info) {
        return ctx.Results.find({ game: parent.id }).project(ctx.exclude).toArray()
    },
    regions: function (parent, args, ctx, info) {
        return ctx.Regions.find({ game: parent.id }).project(ctx.exclude).toArray()
    },
}