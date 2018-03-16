module.exports = {
    results: function (parent, args, ctx, info) {
        return ctx.Results.find({ winner: parent.id }).project(ctx.exclude).toArray()
    }
}