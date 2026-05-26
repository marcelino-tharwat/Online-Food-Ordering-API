import catchAsync from "../utils/catchAsync.js";
import { ApiError } from "../utils/apiError.js";
import ApiFeature from "../utils/apiFeature.js";

export const deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new ApiError("No document found with that ID", 404));
    }

    res.status(204).json({ success: true, data: null });
  });
};

export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new ApiError("No document found with that ID", 404));
    }

    res.status(200).json({ success: true, data: doc });
  });

export const createOne = (Model) =>
  catchAsync(async (req, res, _next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({ success: true, data: doc });
  });

export const getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const doc = await query;

    if (!doc) {
      return next(new ApiError("No document found with that ID", 404));
    }

    res.status(200).json({ success: true, data: doc });
  });

export const getAll = (Model) =>
  catchAsync(async (req, res, _next) => {
    const feature = new ApiFeature(Model.find(), req.query)
      .filter()
      .sort()
      .fields()
      .pagination();

    const doc = await feature.query;
    res.status(200).json({
      success: true,
      count: doc.length,
      data: doc,
    });
  });

