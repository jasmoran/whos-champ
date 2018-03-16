module.exports = {
    regions: function (parent, args, ctx, info) {
        return parent.regions.map(id => ctx.Regions.findOne({ id }, ctx.exclude))
    },
    game: function (parent, args, ctx, info) {
        return ctx.Games.findOne({ id: parent.game }, ctx.exclude)
    },
    winner: function (parent, args, ctx, info) {
        return ctx.Players.findOne({ id: parent.winner }, ctx.exclude)
    },
}