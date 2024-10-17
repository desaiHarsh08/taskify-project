package com.taskify.services;

import com.taskify.dtos.TaskifyTimelineDto;
import com.taskify.utils.PageResponse;

import java.time.LocalDate;

public interface TaskifyTimelineServices {

    TaskifyTimelineDto createTaskifyTimeline(TaskifyTimelineDto taskifyTimelineDto);

    PageResponse<TaskifyTimelineDto> getAllTaskifyTimelines(int pageNumber);

    PageResponse<TaskifyTimelineDto> getUserHistory(int pageNumber, Long userId);

    PageResponse<TaskifyTimelineDto> getTaskifyTimelinesByResourceType(int pageNumber, String resourceType);

    PageResponse<TaskifyTimelineDto> getTaskifyTimelinesByActionType(int pageNumber, String actionType);

    PageResponse<TaskifyTimelineDto> getTaskifyTimelinesByAtDate(int pageNumber, LocalDate date);

    PageResponse<TaskifyTimelineDto> getTaskifyTimelinesByMonthAndYear(int pageNumber, int month, int year);

    PageResponse<TaskifyTimelineDto> getTaskifyTimelinesByTaskAbbreviation(int pageNumber, String taskAbbreviation);

    PageResponse<TaskifyTimelineDto> getTaskifyTimelinesByFunctionName(int pageNumber, String functionName);

}
