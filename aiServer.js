const express = require("express");
const app = express();
const port = 8082;
const {
  mockdata1_2,
  mockdata2_2,
  mockdata3,
  mockdata5,
} = require("./mockdata");
const mockdata = {
  "tumor-information-section": mockdata1_2,
  "tumor-information-pathology-section": mockdata2_2,
  "treatment-decisions": mockdata3,
  "medical-history-signs": mockdata5,
};
// 中间件
app.use(express.json());

// 动态路由处理
app.get("/api/v2/pop/section/:sectionName/ai", (req, res) => {
  const { sectionName } = req.params;
  const { patientId, encounterId, operate } = req.query;

  // 验证必要参数
  if (!patientId || !encounterId) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "缺少必要参数: patientId 和 encounterId",
      timestamp: Date.now(),
    });
  }

  // 模拟AI处理时间延迟 (2-5秒随机延迟)
  const delay = Math.floor(Math.random() * 1000) + 2000; // 2000-5000ms

  setTimeout(() => {
    // 根据请求参数生成响应数据
    const responseData = mockdata[sectionName] || {
      success: false,
      code: 404,
      message: "未找到对应的section数据",
      timestamp: Date.now(),
    };

    // 添加一些动态数据
    if (responseData.result) {
      responseData.result.sectionName = sectionName;
      responseData.result.queryParams = { patientId, encounterId, operate };
    }

    res.json(responseData);
  }, delay);
});

// 模拟OCR任务存储
let ocrTasks = new Map();
let taskIdCounter = 1000;

// 初始化一些mock数据
function initMockTasks() {
  const mockTasksData = [
    {
      id: "896ac4d7e1e2258e77f08633abc6b3fc",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "CONFIRMED",
      fileCount: 1,
      uploadFileName: "胸部CT报告_2024-03-15.pdf",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-03 15:56:48",
      createdOn: "2025-11-03 15:56:48",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-03 15:57:05",
      updatedOn: "2025-11-03 15:57:05",
      completedAt: "2025-11-03 15:57:00",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 1,
        uploadFileName: "胸部CT报告_2024-03-15.pdf",
        fileUrl:
          "http://localhost:8082/files/896ac4d7e1e2258e77f08633abc6b3fc/胸部CT报告_2024-03-15.pdf",
      },
      progress: 100,
    },
    {
      id: "8e77f08633abc6b3fcdcaf0b06ad1cae",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "FINISHED",
      fileCount: 1,
      uploadFileName: "血常规检查_2024-03-20.png",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-03 16:10:14",
      createdOn: "2025-11-03 16:10:14",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-03 16:10:25",
      updatedOn: "2025-11-03 16:10:25",
      completedAt: "2025-11-03 16:10:25",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 1,
        uploadFileName: "血常规检查_2024-03-20.png",
        fileUrl:
          "http://localhost:8082/files/8e77f08633abc6b3fcdcaf0b06ad1cae/血常规检查_2024-03-20.png",
      },
      progress: 100,
    },
    {
      id: "aae2abe0a6a37772a4159b5b9398f29e",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "PROCESSING",
      fileCount: 2,
      uploadFileName: "肝功能检查_2024-03-25.pdf",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-03 17:05:25",
      createdOn: "2025-11-03 17:05:25",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-03 17:05:30",
      updatedOn: "2025-11-03 17:05:30",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 2,
        uploadFileName: "肝功能检查_2024-03-25.pdf",
        fileUrl:
          "http://localhost:8082/files/aae2abe0a6a37772a4159b5b9398f29e/肝功能检查_2024-03-25.pdf",
      },
      progress: 50,
    },
    {
      id: "ef12720b1842d2a51a4922866c85f320",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "WAITING",
      fileCount: 1,
      uploadFileName: "病理切片报告_2024-04-01.jpg",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-03 17:33:33",
      createdOn: "2025-11-03 17:33:33",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-03 17:33:33",
      updatedOn: "2025-11-03 17:33:33",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 1,
        uploadFileName: "病理切片报告_2024-04-01.jpg",
        fileUrl:
          "http://localhost:8082/files/ef12720b1842d2a51a4922866c85f320/病理切片报告_2024-04-01.jpg",
      },
      progress: 0,
    },
    {
      id: "12720b1842d2a51a4922866c85f320dc",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "FAILED",
      fileCount: 1,
      uploadFileName: "核磁共振_2024-04-05.pdf",
      timeoutSeconds: 1800,
      retryCount: 2,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-03 17:37:24",
      createdOn: "2025-11-03 17:37:24",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-03 17:37:40",
      updatedOn: "2025-11-03 17:37:40",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 1,
        uploadFileName: "核磁共振_2024-04-05.pdf",
        fileUrl:
          "http://localhost:8082/files/12720b1842d2a51a4922866c85f320dc/核磁共振_2024-04-05.pdf",
      },
      progress: 0,
      errorMessage: "文件格式错误或损坏",
    },
    // 场景1: 多个文件对应一个报告（体检套餐）
    {
      id: "multi-files-one-report-001",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "CONFIRMED",
      fileCount: 5,
      uploadFileName: "体检报告套餐_2024-05-01.zip",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 09:00:00",
      createdOn: "2025-11-04 09:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 09:05:30",
      updatedOn: "2025-11-04 09:05:30",
      completedAt: "2025-11-04 09:05:00",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 5,
        uploadFileName: "体检报告套餐_2024-05-01.zip",
        files: [
          {
            fileName: "胸部X光.jpg",
            fileUrl:
              "http://localhost:8082/files/multi-files-one-report-001/胸部X光.jpg",
          },
          {
            fileName: "心电图.pdf",
            fileUrl:
              "http://localhost:8082/files/multi-files-one-report-001/心电图.pdf",
          },
          {
            fileName: "血常规.png",
            fileUrl:
              "http://localhost:8082/files/multi-files-one-report-001/血常规.png",
          },
          {
            fileName: "尿常规.png",
            fileUrl:
              "http://localhost:8082/files/multi-files-one-report-001/尿常规.png",
          },
          {
            fileName: "肝肾功能.pdf",
            fileUrl:
              "http://localhost:8082/files/multi-files-one-report-001/肝肾功能.pdf",
          },
        ],
      },
      progress: 100,
    },
    // 场景2: 多个文件对应多个报告（系列检查）
    {
      id: "multi-files-multi-reports-001",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "FINISHED",
      fileCount: 3,
      uploadFileName: "肿瘤标志物系列_2024-05-10.zip",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 10:00:00",
      createdOn: "2025-11-04 10:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 10:03:45",
      updatedOn: "2025-11-04 10:03:45",
      completedAt: "2025-11-04 10:03:00",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 3,
        uploadFileName: "肿瘤标志物系列_2024-05-10.zip",
        files: [
          {
            fileName: "CEA检测报告.pdf",
            fileUrl:
              "http://localhost:8082/files/multi-files-multi-reports-001/CEA检测报告.pdf",
          },
          {
            fileName: "AFP检测报告.pdf",
            fileUrl:
              "http://localhost:8082/files/multi-files-multi-reports-001/AFP检测报告.pdf",
          },
          {
            fileName: "CA199检测报告.pdf",
            fileUrl:
              "http://localhost:8082/files/multi-files-multi-reports-001/CA199检测报告.pdf",
          },
        ],
      },
      progress: 100,
    },
    // 场景3: 多页PDF对应一个完整报告
    {
      id: "multi-page-pdf-one-report-001",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "CONFIRMED",
      fileCount: 1,
      uploadFileName: "完整体检报告_12页_2024-06-01.pdf",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 11:00:00",
      createdOn: "2025-11-04 11:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 11:02:30",
      updatedOn: "2025-11-04 11:02:30",
      completedAt: "2025-11-04 11:02:00",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 1,
        uploadFileName: "完整体检报告_12页_2024-06-01.pdf",
        fileUrl:
          "http://localhost:8082/files/multi-page-pdf-one-report-001/完整体检报告_12页_2024-06-01.pdf",
        pageCount: 12,
      },
      progress: 100,
    },
    // 新增任务：心脏彩超
    {
      id: "task-20251104-001",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "CONFIRMED",
      fileCount: 1,
      uploadFileName: "心脏彩超_2024-07-01.pdf",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 08:00:00",
      createdOn: "2025-11-04 08:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 08:03:00",
      updatedOn: "2025-11-04 08:03:00",
      completedAt: "2025-11-04 08:02:30",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 1,
        uploadFileName: "心脏彩超_2024-07-01.pdf",
        fileUrl:
          "http://localhost:8082/files/task-20251104-001/心脏彩超_2024-07-01.pdf",
      },
      progress: 100,
    },
    // 新增任务：甲状腺功能检查
    {
      id: "task-20251104-002",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "FINISHED",
      fileCount: 1,
      uploadFileName: "甲状腺功能_2024-07-05.pdf",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 09:30:00",
      createdOn: "2025-11-04 09:30:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 09:33:00",
      updatedOn: "2025-11-04 09:33:00",
      completedAt: "2025-11-04 09:32:45",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 1,
        uploadFileName: "甲状腺功能_2024-07-05.pdf",
        fileUrl:
          "http://localhost:8082/files/task-20251104-002/甲状腺功能_2024-07-05.pdf",
      },
      progress: 100,
    },
    // 新增任务：腹部B超
    {
      id: "task-20251104-003",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "CONFIRMED",
      fileCount: 1,
      uploadFileName: "腹部B超_2024-07-10.jpg",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 10:00:00",
      createdOn: "2025-11-04 10:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 10:02:30",
      updatedOn: "2025-11-04 10:02:30",
      completedAt: "2025-11-04 10:02:00",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 1,
        uploadFileName: "腹部B超_2024-07-10.jpg",
        fileUrl:
          "http://localhost:8082/files/task-20251104-003/腹部B超_2024-07-10.jpg",
      },
      progress: 100,
    },
    // 新增任务：糖化血红蛋白
    {
      id: "task-20251104-004",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "PROCESSING",
      fileCount: 1,
      uploadFileName: "糖化血红蛋白_2024-07-15.png",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 11:00:00",
      createdOn: "2025-11-04 11:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 11:01:30",
      updatedOn: "2025-11-04 11:01:30",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 1,
        uploadFileName: "糖化血红蛋白_2024-07-15.png",
        fileUrl:
          "http://localhost:8082/files/task-20251104-004/糖化血红蛋白_2024-07-15.png",
      },
      progress: 60,
    },
    // 新增任务：骨密度检测
    {
      id: "task-20251104-005",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "WAITING",
      fileCount: 1,
      uploadFileName: "骨密度检测_2024-07-20.pdf",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 12:00:00",
      createdOn: "2025-11-04 12:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 12:00:00",
      updatedOn: "2025-11-04 12:00:00",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 1,
        uploadFileName: "骨密度检测_2024-07-20.pdf",
        fileUrl:
          "http://localhost:8082/files/task-20251104-005/骨密度检测_2024-07-20.pdf",
      },
      progress: 0,
    },
    // 新增任务：胃镜检查
    {
      id: "task-20251104-006",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "FINISHED",
      fileCount: 2,
      uploadFileName: "胃镜检查_2024-08-01.pdf",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 13:00:00",
      createdOn: "2025-11-04 13:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 13:04:00",
      updatedOn: "2025-11-04 13:04:00",
      completedAt: "2025-11-04 13:03:30",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 2,
        uploadFileName: "胃镜检查_2024-08-01.pdf",
        fileUrl:
          "http://localhost:8082/files/task-20251104-006/胃镜检查_2024-08-01.pdf",
        files: [
          {
            fileName: "胃镜检查报告.pdf",
            fileUrl:
              "http://localhost:8082/files/task-20251104-006/胃镜检查报告.pdf",
          },
          {
            fileName: "胃镜图像.jpg",
            fileUrl:
              "http://localhost:8082/files/task-20251104-006/胃镜图像.jpg",
          },
        ],
      },
      progress: 100,
    },
    // 新增任务：肺功能检查
    {
      id: "task-20251104-007",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "CONFIRMED",
      fileCount: 1,
      uploadFileName: "肺功能检查_2024-08-05.pdf",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 14:00:00",
      createdOn: "2025-11-04 14:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 14:02:45",
      updatedOn: "2025-11-04 14:02:45",
      completedAt: "2025-11-04 14:02:15",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 1,
        uploadFileName: "肺功能检查_2024-08-05.pdf",
        fileUrl:
          "http://localhost:8082/files/task-20251104-007/肺功能检查_2024-08-05.pdf",
      },
      progress: 100,
    },
    // 新增任务：过敏原检测
    {
      id: "task-20251104-008",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "PROCESSING",
      fileCount: 1,
      uploadFileName: "过敏原检测_2024-08-10.png",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 15:00:00",
      createdOn: "2025-11-04 15:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 15:01:00",
      updatedOn: "2025-11-04 15:01:00",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 1,
        uploadFileName: "过敏原检测_2024-08-10.png",
        fileUrl:
          "http://localhost:8082/files/task-20251104-008/过敏原检测_2024-08-10.png",
      },
      progress: 45,
    },
    // 新增任务：血脂全套
    {
      id: "task-20251104-009",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "FINISHED",
      fileCount: 1,
      uploadFileName: "血脂全套_2024-08-15.pdf",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 16:00:00",
      createdOn: "2025-11-04 16:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 16:02:30",
      updatedOn: "2025-11-04 16:02:30",
      completedAt: "2025-11-04 16:02:00",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 1,
        uploadFileName: "血脂全套_2024-08-15.pdf",
        fileUrl:
          "http://localhost:8082/files/task-20251104-009/血脂全套_2024-08-15.pdf",
      },
      progress: 100,
    },
    // 新增任务：颈动脉彩超
    {
      id: "task-20251104-010",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "CONFIRMED",
      fileCount: 1,
      uploadFileName: "颈动脉彩超_2024-08-20.jpg",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 17:00:00",
      createdOn: "2025-11-04 17:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 17:02:15",
      updatedOn: "2025-11-04 17:02:15",
      completedAt: "2025-11-04 17:01:45",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 1,
        uploadFileName: "颈动脉彩超_2024-08-20.jpg",
        fileUrl:
          "http://localhost:8082/files/task-20251104-010/颈动脉彩超_2024-08-20.jpg",
      },
      progress: 100,
    },
    // 新增任务：乙肝五项
    {
      id: "task-20251104-011",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "WAITING",
      fileCount: 1,
      uploadFileName: "乙肝五项_2024-08-25.png",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 18:00:00",
      createdOn: "2025-11-04 18:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 18:00:00",
      updatedOn: "2025-11-04 18:00:00",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 1,
        uploadFileName: "乙肝五项_2024-08-25.png",
        fileUrl:
          "http://localhost:8082/files/task-20251104-011/乙肝五项_2024-08-25.png",
      },
      progress: 0,
    },
    // 新增任务：前列腺特异抗原
    {
      id: "task-20251104-012",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "FINISHED",
      fileCount: 1,
      uploadFileName: "前列腺特异抗原_2024-09-01.pdf",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 19:00:00",
      createdOn: "2025-11-04 19:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 19:02:00",
      updatedOn: "2025-11-04 19:02:00",
      completedAt: "2025-11-04 19:01:30",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 1,
        uploadFileName: "前列腺特异抗原_2024-09-01.pdf",
        fileUrl:
          "http://localhost:8082/files/task-20251104-012/前列腺特异抗原_2024-09-01.pdf",
      },
      progress: 100,
    },
    // 新增任务：风湿免疫全套
    {
      id: "task-20251104-013",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "PROCESSING",
      fileCount: 1,
      uploadFileName: "风湿免疫全套_2024-09-05.pdf",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 20:00:00",
      createdOn: "2025-11-04 20:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 20:01:15",
      updatedOn: "2025-11-04 20:01:15",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 1,
        uploadFileName: "风湿免疫全套_2024-09-05.pdf",
        fileUrl:
          "http://localhost:8082/files/task-20251104-013/风湿免疫全套_2024-09-05.pdf",
      },
      progress: 55,
    },
    // 新增任务：大便常规
    {
      id: "task-20251104-014",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "CONFIRMED",
      fileCount: 1,
      uploadFileName: "大便常规_2024-09-10.png",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 21:00:00",
      createdOn: "2025-11-04 21:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 21:01:45",
      updatedOn: "2025-11-04 21:01:45",
      completedAt: "2025-11-04 21:01:15",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 1,
        uploadFileName: "大便常规_2024-09-10.png",
        fileUrl:
          "http://localhost:8082/files/task-20251104-014/大便常规_2024-09-10.png",
      },
      progress: 100,
    },
    // 新增任务：脑部CT
    {
      id: "task-20251104-015",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "FAILED",
      fileCount: 1,
      uploadFileName: "脑部CT_2024-09-15.pdf",
      timeoutSeconds: 1800,
      retryCount: 3,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 22:00:00",
      createdOn: "2025-11-04 22:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 22:05:00",
      updatedOn: "2025-11-04 22:05:00",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 1,
        uploadFileName: "脑部CT_2024-09-15.pdf",
        fileUrl:
          "http://localhost:8082/files/task-20251104-015/脑部CT_2024-09-15.pdf",
      },
      progress: 0,
      errorMessage: "OCR识别失败，图像质量过低",
    },
    // 新增：全面体检套餐（多文件多报告 - CONFIRMED状态）
    {
      id: "multi-files-reports-001",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "CONFIRMED",
      fileCount: 8,
      uploadFileName: "全面体检套餐_2024-10-01.zip",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 09:00:00",
      createdOn: "2025-11-04 09:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 09:10:30",
      updatedOn: "2025-11-04 09:10:30",
      completedAt: "2025-11-04 09:10:00",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 8,
        uploadFileName: "全面体检套餐_2024-10-01.zip",
        fileUrl:
          "http://localhost:8082/files/multi-files-reports-001/全面体检套餐_2024-10-01.zip",
        scenario: "multi-files-multi-reports",
        reportCount: 8,
      },
      progress: 100,
    },
    // 新增：肿瘤标志物全套（多文件多报告 - CONFIRMED状态）
    {
      id: "multi-files-reports-002",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "CONFIRMED",
      fileCount: 6,
      uploadFileName: "肿瘤标志物全套_2024-10-05.zip",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 10:00:00",
      createdOn: "2025-11-04 10:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 10:08:45",
      updatedOn: "2025-11-04 10:08:45",
      completedAt: "2025-11-04 10:08:15",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 6,
        uploadFileName: "肿瘤标志物全套_2024-10-05.zip",
        fileUrl:
          "http://localhost:8082/files/multi-files-reports-002/肿瘤标志物全套_2024-10-05.zip",
        scenario: "multi-files-multi-reports",
        reportCount: 6,
      },
      progress: 100,
    },
    // 新增：心血管检查套餐（多文件多报告 - CONFIRMED状态）
    {
      id: "multi-files-reports-003",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "CONFIRMED",
      fileCount: 5,
      uploadFileName: "心血管检查套餐_2024-10-10.zip",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 11:00:00",
      createdOn: "2025-11-04 11:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 11:07:20",
      updatedOn: "2025-11-04 11:07:20",
      completedAt: "2025-11-04 11:06:50",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 5,
        uploadFileName: "心血管检查套餐_2024-10-10.zip",
        fileUrl:
          "http://localhost:8082/files/multi-files-reports-003/心血管检查套餐_2024-10-10.zip",
        scenario: "multi-files-multi-reports",
        reportCount: 5,
      },
      progress: 100,
    },
    // 新增：内分泌检查组合（多文件多报告 - CONFIRMED状态）
    {
      id: "multi-files-reports-004",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "CONFIRMED",
      fileCount: 7,
      uploadFileName: "内分泌检查组合_2024-10-15.zip",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 12:00:00",
      createdOn: "2025-11-04 12:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 12:09:15",
      updatedOn: "2025-11-04 12:09:15",
      completedAt: "2025-11-04 12:08:45",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 7,
        uploadFileName: "内分泌检查组合_2024-10-15.zip",
        fileUrl:
          "http://localhost:8082/files/multi-files-reports-004/内分泌检查组合_2024-10-15.zip",
        scenario: "multi-files-multi-reports",
        reportCount: 7,
      },
      progress: 100,
    },
    // 新增：影像学检查套餐（多文件多报告 - CONFIRMED状态）
    {
      id: "multi-files-reports-005",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "CONFIRMED",
      fileCount: 9,
      uploadFileName: "影像学检查套餐_2024-10-20.zip",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 13:00:00",
      createdOn: "2025-11-04 13:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 13:11:50",
      updatedOn: "2025-11-04 13:11:50",
      completedAt: "2025-11-04 13:11:20",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 9,
        uploadFileName: "影像学检查套餐_2024-10-20.zip",
        fileUrl:
          "http://localhost:8082/files/multi-files-reports-005/影像学检查套餐_2024-10-20.zip",
        scenario: "multi-files-multi-reports",
        reportCount: 9,
      },
      progress: 100,
    },
    // 新增：消化系统检查套餐（多文件多报告 - CONFIRMED状态）
    {
      id: "multi-files-reports-006",
      patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
      taskStatus: "CONFIRMED",
      fileCount: 6,
      uploadFileName: "消化系统检查套餐_2024-10-25.zip",
      timeoutSeconds: 1800,
      retryCount: 0,
      maxRetryCount: 3,
      createdBy: "hua.yan@roche.com",
      createdAt: "2025-11-04 14:00:00",
      createdOn: "2025-11-04 14:00:00",
      updatedBy: "hua.yan@roche.com",
      updatedAt: "2025-11-04 14:08:30",
      updatedOn: "2025-11-04 14:08:30",
      completedAt: "2025-11-04 14:08:00",
      deleted: false,
      data: {
        patientId: "f6e0ee0f-313f-4afc-8c8b-e8c904493231",
        fileCount: 6,
        uploadFileName: "消化系统检查套餐_2024-10-25.zip",
        fileUrl:
          "http://localhost:8082/files/multi-files-reports-006/消化系统检查套餐_2024-10-25.zip",
        scenario: "multi-files-multi-reports",
        reportCount: 6,
      },
      progress: 100,
    },
  ];

  mockTasksData.forEach((task) => {
    ocrTasks.set(task.id, task);
  });
}

// 初始化mock数据
initMockTasks();

/**
 * 创建患者报告图片包解析任务
 */
app.post("/api/v2/ocr/medical-reports/tasks", (req, res) => {
  // 生成32位随机ID
  const taskId = Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");

  const now = new Date();
  const formattedDate = now.toISOString().replace("T", " ").substring(0, 19);

  const task = {
    id: taskId,
    patientId: req.body.patientId || "",
    taskStatus: "WAITING", // WAITING(进行中), PROCESSING(进行中), FINISHED(待确认), CONFIRMED(已确认), FAILED(处理失败)
    fileCount: req.body.fileCount || 1,
    uploadFileName:
      req.body.uploadFileName || req.body.fileName || "unknown.file",
    timeoutSeconds: 1800,
    retryCount: 0,
    maxRetryCount: 3,
    createdBy: req.body.createdBy || "system@example.com",
    createdAt: formattedDate,
    createdOn: formattedDate,
    updatedBy: req.body.createdBy || "system@example.com",
    updatedAt: formattedDate,
    updatedOn: formattedDate,
    deleted: false,
    data: req.body,
    progress: 0,
  };

  ocrTasks.set(taskId, task);

  // 模拟异步处理
  setTimeout(() => {
    const currentTask = ocrTasks.get(taskId);
    if (currentTask) {
      currentTask.taskStatus = "PROCESSING";
      currentTask.progress = 50;
      const updateTime = new Date()
        .toISOString()
        .replace("T", " ")
        .substring(0, 19);
      currentTask.updatedAt = updateTime;
      currentTask.updatedOn = updateTime;
      ocrTasks.set(taskId, currentTask);
    }
  }, 2000);

  setTimeout(() => {
    const currentTask = ocrTasks.get(taskId);
    if (currentTask) {
      currentTask.taskStatus = "FINISHED";
      currentTask.progress = 100;
      const completeTime = new Date()
        .toISOString()
        .replace("T", " ")
        .substring(0, 19);
      currentTask.completedAt = completeTime;
      currentTask.updatedAt = completeTime;
      currentTask.updatedOn = completeTime;
      ocrTasks.set(taskId, currentTask);
    }
  }, 5000);

  res.json({
    success: true,
    code: 200,
    result: {
      id: taskId,
      taskStatus: "WAITING",
      message: "任务创建成功",
    },
    timestamp: Date.now(),
  });
});

/**
 * 查询患者OCR任务列表
 */
app.get("/api/v2/ocr/medical-reports/tasks", (req, res) => {
  const { patientId, taskStatus, pageNum = 1, pageSize = 10 } = req.query;

  let tasks = Array.from(ocrTasks.values());

  // 按patientId过滤
  if (patientId) {
    tasks = tasks.filter(
      (task) => task.data && task.data.patientId === patientId
    );
  }

  // 按状态过滤
  if (taskStatus) {
    tasks = tasks.filter((task) => task.taskStatus === taskStatus);
  }

  // 分页
  const currentPage = parseInt(pageNum);
  const pageCount = parseInt(pageSize);
  const startIndex = (currentPage - 1) * pageCount;
  const endIndex = startIndex + pageCount;
  const paginatedTasks = tasks.slice(startIndex, endIndex);

  // 转换为指定的数据格式
  const records = paginatedTasks.map((task) => ({
    id: task.id,
    patientId: task.data?.patientId || "",
    taskStatus: task.taskStatus || "WAITING",
    fileCount: task.data?.fileCount || 1,
    uploadFileName: task.data?.uploadFileName || "unknown.file",
    timeoutSeconds: task.timeoutSeconds || 1800,
    retryCount: task.retryCount || 0,
    maxRetryCount: task.maxRetryCount || 3,
    createdBy: task.createdBy || "system@example.com",
    createdOn: task.createdAt,
    updatedBy: task.updatedBy || "system@example.com",
    updatedOn: task.updatedAt || task.createdAt,
    deleted: false,
  }));

  res.json({
    success: true,
    code: 200,
    result: {
      records: records,
      total: tasks.length,
      pageNum: currentPage,
      pageSize: pageCount,
      totalPage: Math.ceil(tasks.length / pageCount),
    },
    timestamp: Date.now(),
  });
});

/**
 * 查询OCR待处理任务状态（直接传递任务ID数组）
 */
app.post("/api/v2/ocr/medical-reports/tasks/status", (req, res) => {
  const taskIds = req.body;

  if (!Array.isArray(taskIds)) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "请求体必须是任务ID数组",
      timestamp: Date.now(),
    });
  }

  const taskStatuses = taskIds
    .map((taskId) => {
      const task = ocrTasks.get(taskId);
      if (task) {
        return {
          id: task.id,
          patientId: task.patientId || "",
          taskStatus: task.taskStatus || "WAITING",
          fileCount: task.fileCount || 1,
          uploadFileName: task.uploadFileName || "unknown.file",
          timeoutSeconds: task.timeoutSeconds || 1800,
          retryCount: task.retryCount || 0,
          maxRetryCount: task.maxRetryCount || 3,
          createdBy: task.createdBy || "system@example.com",
          createdOn: task.createdOn || task.createdAt,
          updatedBy: task.updatedBy || "system@example.com",
          updatedOn: task.updatedOn || task.updatedAt || task.createdAt,
          deleted: false,
        };
      } else {
        // 任务不存在时返回null或者可以选择不返回
        return null;
      }
    })
    .filter((task) => task !== null); // 过滤掉不存在的任务

  res.json({
    success: true,
    code: 200,
    result: taskStatuses,
    timestamp: Date.now(),
  });
});

/**
 * 重置OCR解析任务 - 将任务状态重置为进行中(PROCESSING)
 */
app.post("/api/v2/ocr/medical-reports/tasks/reset", (req, res) => {
  const taskIds = req.body;

  if (!Array.isArray(taskIds)) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "请求体必须是任务ID数组",
      timestamp: Date.now(),
    });
  }

  if (taskIds.length === 0) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "任务ID数组不能为空",
      timestamp: Date.now(),
    });
  }

  const results = [];
  const now = new Date();
  const formattedDate = now.toISOString().replace("T", " ").substring(0, 19);

  taskIds.forEach((item) => {
    const task = ocrTasks.get(item.id);

    if (!task) {
      results.push({
        taskId: taskId,
        success: false,
        message: "任务不存在",
      });
      return;
    }

    // 只有FAILED状态的任务可以重置
    if (task.taskStatus !== "FAILED") {
      results.push({
        taskId: taskId,
        success: false,
        message: `任务状态为 ${task.taskStatus}，只有失败状态的任务可以重置`,
        currentStatus: task.taskStatus,
      });
      return;
    }

    // 重置任务状态
    task.taskStatus = item.taskStatus || "PROCESSING";
    task.progress = 0;
    task.retryCount = (task.retryCount || 0) + 1;
    task.updatedBy = "system@example.com";
    task.updatedAt = formattedDate;
    task.updatedOn = formattedDate;

    // 清除完成时间和错误信息
    delete task.completedAt;
    delete task.errorMessage;

    ocrTasks.set(taskId, task);

    // 模拟重新处理
    setTimeout(() => {
      const currentTask = ocrTasks.get(taskId);
      if (currentTask && currentTask.taskStatus === "PROCESSING") {
        currentTask.progress = 50;
        const updateTime = new Date()
          .toISOString()
          .replace("T", " ")
          .substring(0, 19);
        currentTask.updatedAt = updateTime;
        currentTask.updatedOn = updateTime;
        ocrTasks.set(taskId, currentTask);
      }
    }, 2000);

    setTimeout(() => {
      const currentTask = ocrTasks.get(taskId);
      if (currentTask && currentTask.taskStatus === "PROCESSING") {
        currentTask.taskStatus = "FINISHED";
        currentTask.progress = 100;
        const completeTime = new Date()
          .toISOString()
          .replace("T", " ")
          .substring(0, 19);
        currentTask.completedAt = completeTime;
        currentTask.updatedAt = completeTime;
        currentTask.updatedOn = completeTime;
        ocrTasks.set(taskId, currentTask);
      }
    }, 5000);

    results.push({
      taskId: taskId,
      success: true,
      message: "任务已重置为进行中",
      newStatus: "PROCESSING",
      retryCount: task.retryCount,
    });
  });

  // 统计结果
  const successCount = results.filter((r) => r.success).length;
  const failCount = results.length - successCount;

  res.json({
    success: true,
    code: 200,
    result: {
      total: taskIds.length,
      successCount: successCount,
      failCount: failCount,
      details: results,
    },
    message: `成功重置 ${successCount} 个任务，失败 ${failCount} 个`,
    timestamp: Date.now(),
  });
});

/**
 * 保存更新OCR解析结果
 */
app.put("/api/v2/ocr/medical-reports/tasks/:taskId/result", (req, res) => {
  const { taskId } = req.params;
  const data = req.body;

  // 检查任务是否存在
  const task = ocrTasks.get(taskId);
  if (!task) {
    return res.status(404).json({
      success: false,
      code: 404,
      message: "任务不存在",
      timestamp: Date.now(),
    });
  }

  // 检查任务状态（只有FINISHED或CONFIRMED状态可以更新）
  if (task.taskStatus !== "FINISHED" && task.taskStatus !== "CONFIRMED") {
    return res.status(400).json({
      success: false,
      code: 400,
      message: `任务状态为 ${task.taskStatus}，只有已完成或已确认的任务可以更新结果`,
      currentStatus: task.taskStatus,
      timestamp: Date.now(),
    });
  }

  // 验证必要字段 - data应该是报告数组 [{id, reportContentMarkdown}]
  if (!Array.isArray(data)) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "请求数据必须是数组格式",
      timestamp: Date.now(),
    });
  }

  // 验证每个报告对象的字段
  for (let i = 0; i < data.length; i++) {
    const report = data[i];
    if (!report.id) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: `报告[${i}]缺少id字段`,
        timestamp: Date.now(),
      });
    }
    if (typeof report.reportContentMarkdown !== "string") {
      return res.status(400).json({
        success: false,
        code: 400,
        message: `报告[${i}]的reportContentMarkdown必须是字符串`,
        timestamp: Date.now(),
      });
    }
  }

  // 更新任务的OCR结果数据
  const now = new Date();
  const formattedDate = now.toISOString().replace("T", " ").substring(0, 19);

  // 记录保存前的状态
  const wasConfirmed = task.taskStatus === "CONFIRMED";

  // 更新任务中存储的报告内容
  task.data = task.data || {};
  task.data.savedReports = data.map((report) => ({
    id: report.id,
    reportContentMarkdown: report.reportContentMarkdown,
    reportStatus: wasConfirmed ? "CONFIRMED" : "DRAFT", // 如果已确认则保持CONFIRMED状态
    updatedAt: formattedDate,
  }));

  // 只有FINISHED状态才更新为CONFIRMED，如果已经是CONFIRMED则保持不变
  if (task.taskStatus === "FINISHED") {
    task.taskStatus = "CONFIRMED";
    task.completedAt = formattedDate;
  }

  // 更新任务的修改信息
  task.updatedBy = "system@example.com";
  task.updatedAt = formattedDate;
  task.updatedOn = formattedDate;

  ocrTasks.set(taskId, task);

  res.json({
    success: true,
    code: 200,
    result: {
      taskId: taskId,
      taskStatus: task.taskStatus,
      updatedAt: formattedDate,
      message: "OCR结果保存成功",
    },
    timestamp: Date.now(),
  });
});

/**
 * 获取OCR解析结果
 */
app.get("/api/v2/ocr/medical-reports/results/:taskId", (req, res) => {
  const { taskId } = req.params;
  const task = ocrTasks.get(taskId);

  if (!task) {
    return res.status(404).json({
      success: false,
      code: 404,
      message: "任务不存在",
      timestamp: Date.now(),
    });
  }

  if (task.taskStatus !== "FINISHED" && task.taskStatus !== "CONFIRMED") {
    return res.status(400).json({
      success: false,
      code: 400,
      message: `任务状态为 ${task.taskStatus}，无法获取结果`,
      timestamp: Date.now(),
    });
  }

  // 生成文件UUID
  const fileId = Array.from({ length: 36 }, (_, i) => {
    if (i === 8 || i === 13 || i === 18 || i === 23) return "-";
    return Math.floor(Math.random() * 16).toString(16);
  }).join("");

  // 根据文件名生成不同的医疗报告内容
  const generateReportContent = (fileName) => {
    if (fileName.includes("胸部CT") || fileName.includes("CT")) {
      return `# 胸部CT检查报告

## 患者信息
- **姓名**: 张三
- **性别**: 男
- **年龄**: 45岁
- **病历号**: 2024031500123
- **检查日期**: 2024年3月15日

## 检查项目
胸部CT平扫+增强扫描

## 检查所见
**肺部**：
- 双肺透亮度正常，肺纹理清晰
- 未见明显实质性病变
- 未见明显结节、肿块影
- 双肺门结构清晰，未见肿大淋巴结

**纵隔**：
- 纵隔居中，气管通畅
- 纵隔内未见肿大淋巴结
- 主动脉弓及其分支走行正常

**心脏**：
- 心影大小、形态正常
- 心包未见明显积液

**胸膜**：
- 双侧胸膜光滑，未见增厚
- 未见胸腔积液

**骨骼**：
- 胸廓骨骼结构完整
- 未见明显骨质破坏

## 诊断意见
1. 双肺未见明显异常
2. 心影大小形态正常
3. 建议：定期复查，如有不适请及时就医

## 报告医师
李医生 主任医师

## 审核医师
王医生 副主任医师

---
*报告时间: 2024-03-15 14:30*  
*本报告由OCR系统自动解析生成*`;
    } else if (fileName.includes("血常规") || fileName.includes("血液")) {
      return `# 血常规检查报告

## 患者信息
- **姓名**: 张三
- **性别**: 男
- **年龄**: 45岁
- **病历号**: 2024032000456
- **检查日期**: 2024年3月20日
- **标本类型**: 静脉血

## 检查结果

### 红细胞系统
| 项目 | 结果 | 单位 | 参考范围 | 提示 |
|------|------|------|----------|------|
| 红细胞计数(RBC) | 4.85 | ×10¹²/L | 4.0-5.5 | 正常 |
| 血红蛋白(HGB) | 145 | g/L | 120-160 | 正常 |
| 红细胞压积(HCT) | 43.5 | % | 35-50 | 正常 |
| 平均红细胞体积(MCV) | 89.7 | fL | 80-100 | 正常 |
| 平均红细胞血红蛋白量(MCH) | 29.9 | pg | 27-34 | 正常 |
| 平均红细胞血红蛋白浓度(MCHC) | 333 | g/L | 320-360 | 正常 |
| 红细胞分布宽度(RDW-CV) | 12.8 | % | 11.5-14.5 | 正常 |

### 白细胞系统
| 项目 | 结果 | 单位 | 参考范围 | 提示 |
|------|------|------|----------|------|
| 白细胞计数(WBC) | 6.8 | ×10⁹/L | 4.0-10.0 | 正常 |
| 中性粒细胞百分比(NEUT%) | 58.5 | % | 50-70 | 正常 |
| 淋巴细胞百分比(LYMPH%) | 32.0 | % | 20-40 | 正常 |
| 单核细胞百分比(MONO%) | 6.5 | % | 3-8 | 正常 |
| 嗜酸性粒细胞百分比(EO%) | 2.5 | % | 0.5-5 | 正常 |
| 嗜碱性粒细胞百分比(BASO%) | 0.5 | % | 0-1 | 正常 |

### 血小板系统
| 项目 | 结果 | 单位 | 参考范围 | 提示 |
|------|------|------|----------|------|
| 血小板计数(PLT) | 235 | ×10⁹/L | 100-300 | 正常 |
| 平均血小板体积(MPV) | 10.2 | fL | 7.0-11.0 | 正常 |
| 血小板分布宽度(PDW) | 12.5 | % | 9-17 | 正常 |
| 血小板压积(PCT) | 0.24 | % | 0.1-0.5 | 正常 |

## 检验结论
各项血常规指标均在正常范围内，未见明显异常。

## 建议
继续保持健康生活方式，定期体检。

## 检验医师
赵医生

---
*检验时间: 2024-03-20 09:15*  
*报告时间: 2024-03-20 10:30*  
*本报告由OCR系统自动解析生成*`;
    } else if (fileName.includes("肝功能") || fileName.includes("生化")) {
      return `# 肝功能检查报告

## 患者信息
- **姓名**: 张三
- **性别**: 男
- **年龄**: 45岁
- **病历号**: 2024032500789
- **检查日期**: 2024年3月25日
- **标本类型**: 空腹静脉血

## 检查结果

### 肝功能指标
| 项目 | 结果 | 单位 | 参考范围 | 提示 |
|------|------|------|----------|------|
| 丙氨酸氨基转移酶(ALT) | 28 | U/L | 0-40 | 正常 |
| 天冬氨酸氨基转移酶(AST) | 25 | U/L | 0-40 | 正常 |
| AST/ALT比值 | 0.89 | - | 0.8-2.0 | 正常 |
| 总蛋白(TP) | 72.5 | g/L | 60-80 | 正常 |
| 白蛋白(ALB) | 45.8 | g/L | 35-50 | 正常 |
| 球蛋白(GLO) | 26.7 | g/L | 20-35 | 正常 |
| 白球比(A/G) | 1.72 | - | 1.5-2.5 | 正常 |
| 总胆红素(TBIL) | 15.2 | μmol/L | 3.4-20.5 | 正常 |
| 直接胆红素(DBIL) | 4.8 | μmol/L | 0-6.8 | 正常 |
| 间接胆红素(IBIL) | 10.4 | μmol/L | 1.7-13.7 | 正常 |
| 碱性磷酸酶(ALP) | 85 | U/L | 40-150 | 正常 |
| γ-谷氨酰转移酶(GGT) | 32 | U/L | 7-50 | 正常 |

### 肾功能指标
| 项目 | 结果 | 单位 | 参考范围 | 提示 |
|------|------|------|----------|------|
| 尿素氮(BUN) | 5.2 | mmol/L | 2.9-8.2 | 正常 |
| 肌酐(Cr) | 85 | μmol/L | 57-111 | 正常 |
| 尿酸(UA) | 320 | μmol/L | 208-428 | 正常 |

### 血脂指标
| 项目 | 结果 | 单位 | 参考范围 | 提示 |
|------|------|------|----------|------|
| 总胆固醇(TC) | 4.85 | mmol/L | 3.1-5.7 | 正常 |
| 甘油三酯(TG) | 1.45 | mmol/L | 0.56-1.7 | 正常 |
| 高密度脂蛋白(HDL-C) | 1.35 | mmol/L | >1.04 | 正常 |
| 低密度脂蛋白(LDL-C) | 2.85 | mmol/L | <3.37 | 正常 |

### 血糖指标
| 项目 | 结果 | 单位 | 参考范围 | 提示 |
|------|------|------|----------|------|
| 空腹血糖(GLU) | 5.2 | mmol/L | 3.9-6.1 | 正常 |

## 检验结论
1. 肝功能各项指标正常
2. 肾功能正常
3. 血脂水平正常
4. 空腹血糖正常

## 建议
- 各项生化指标均在正常范围内
- 建议保持健康饮食习惯
- 适度运动，定期复查
- 如有不适请及时就医

## 检验医师
孙医生 主管检验师

## 审核医师
周医生 副主任检验师

---
*采血时间: 2024-03-25 07:30*  
*检验时间: 2024-03-25 08:45*  
*报告时间: 2024-03-25 10:00*  
*本报告由OCR系统自动解析生成*`;
    } else if (fileName.includes("病理") || fileName.includes("切片")) {
      return `# 病理检查报告

## 患者信息
- **姓名**: 张三
- **性别**: 男
- **年龄**: 45岁
- **病历号**: 2024040100234
- **送检日期**: 2024年4月1日
- **报告日期**: 2024年4月5日

## 送检材料
- **标本名称**: 胃窦部活检组织
- **标本数量**: 3块
- **临床诊断**: 慢性胃炎？胃溃疡？

## 临床资料
患者主诉上腹部不适半年，伴间断性疼痛，胃镜检查示：胃窦部黏膜充血、糜烂，取活检。

## 大体检查
收到灰白、灰红色不规则组织3块，大小约0.2-0.4cm，质软。全部取材。

## 镜下所见
### HE染色
- 胃黏膜组织，表面被覆柱状上皮
- 固有层见慢性炎性细胞浸润，以淋巴细胞、浆细胞为主
- 腺体轻度萎缩，排列尚规则
- 间质轻度纤维组织增生
- 未见肠上皮化生
- 未见异型增生
- 未见幽门螺杆菌

### 免疫组化染色
- Ki-67: 约5%细胞核阳性（增殖指数低）
- P53: 阴性
- CK7: 腺体阳性
- CK20: 腺体阳性

## 病理诊断
**（胃窦部）慢性非萎缩性胃炎伴轻度活动**

### 诊断说明
1. 慢性炎性细胞浸润为主
2. 腺体结构基本保持
3. 未见肠化生及异型增生
4. 未检出幽门螺杆菌

## 建议
1. 结合临床及胃镜检查结果综合诊断
2. 建议规范抗炎治疗
3. 改善生活饮食习惯
4. 必要时复查胃镜及活检
5. 如有疑问可进行病理会诊

## 病理医师
吴医生 副主任医师

## 审核医师
郑医生 主任医师

---
*取材日期: 2024-04-01*  
*制片日期: 2024-04-02-04-03*  
*诊断日期: 2024-04-05*  
*本报告由OCR系统自动解析生成*`;
    } else {
      return `# 医疗检查报告

## 患者信息
- **姓名**: 张三
- **性别**: 男
- **年龄**: 45岁
- **检查日期**: 2024年3月15日

## 检查项目
常规体检

## 检查结果
各项指标正常，未见明显异常。

## 建议
定期复查，保持健康生活方式。

---
*本报告由OCR系统自动解析生成，仅供参考*`;
    }
  };

  // 处理不同场景的文件和报告
  let files = [];
  let reports = [];

  // 场景1: 多个文件对应一个报告（体检套餐）
  if (taskId === "multi-files-one-report-001") {
    files = task.data.files.map((file, index) => ({
      id: Array.from({ length: 36 }, (_, i) => {
        if (i === 8 || i === 13 || i === 18 || i === 23) return "-";
        return Math.floor(Math.random() * 16).toString(16);
      }).join(""),
      fileName: file.fileName,
      originalFileName: file.fileName,
      contentType: file.fileName.endsWith(".pdf")
        ? "application/pdf"
        : file.fileName.endsWith(".png")
        ? "image/png"
        : file.fileName.endsWith(".jpg") || file.fileName.endsWith(".jpeg")
        ? "image/jpeg"
        : "application/octet-stream",
      fileSequence: index + 1,
      fileServicePath: `ocr/${task.patientId}/${taskId}/${file.fileName}`,
      reportId: 1, // 所有文件对应同一个报告
      fileUrl: file.fileUrl,
      downloadUrl: `${file.fileUrl}?download=true`,
      previewUrl: `http://localhost:8082/api/v2/ocr/medical-reports/files/${taskId}/preview`,
    }));

    reports = [
      {
        id: 1,
        content: `# 综合体检报告

## 患者信息
- **姓名**: 张三
- **性别**: 男
- **年龄**: 45岁
- **体检日期**: 2024年5月1日
- **体检编号**: TJ20240501001

## 检查项目汇总
本次体检共完成5项检查，包括：
1. 胸部X光检查
2. 心电图检查
3. 血常规检查
4. 尿常规检查
5. 肝肾功能检查

---

## 一、胸部X光检查

### 检查所见
- 双肺纹理清晰，未见明显实质性病变
- 心影大小正常，心膈角锐利
- 纵隔居中，气管通畅
- 膈面光滑，肋膈角锐利

### 诊断意见
双肺未见明显异常

---

## 二、心电图检查

### 检查结果
- 心率：72次/分
- 心律：窦性心律
- PR间期：160ms（正常）
- QRS时限：90ms（正常）
- QT/QTc：380/410ms（正常）

### 诊断意见
窦性心律，心电图正常

---

## 三、血常规检查

| 项目 | 结果 | 单位 | 参考范围 |
|------|------|------|----------|
| 白细胞(WBC) | 6.5 | ×10⁹/L | 4.0-10.0 |
| 红细胞(RBC) | 4.8 | ×10¹²/L | 4.0-5.5 |
| 血红蛋白(HGB) | 142 | g/L | 120-160 |
| 血小板(PLT) | 220 | ×10⁹/L | 100-300 |

### 结论
血常规各项指标正常

---

## 四、尿常规检查

| 项目 | 结果 | 参考范围 |
|------|------|----------|
| 尿蛋白 | 阴性(-) | 阴性 |
| 尿糖 | 阴性(-) | 阴性 |
| 尿胆原 | 正常 | 正常 |
| 尿胆红素 | 阴性(-) | 阴性 |
| 白细胞 | 阴性(-) | 阴性 |
| 红细胞 | 阴性(-) | 阴性 |

### 结论
尿常规各项指标正常

---

## 五、肝肾功能检查

### 肝功能
| 项目 | 结果 | 单位 | 参考范围 |
|------|------|------|----------|
| ALT | 25 | U/L | 0-40 |
| AST | 28 | U/L | 0-40 |
| 总胆红素 | 12.5 | μmol/L | 3.4-20.5 |

### 肾功能
| 项目 | 结果 | 单位 | 参考范围 |
|------|------|------|----------|
| 尿素氮 | 5.0 | mmol/L | 2.9-8.2 |
| 肌酐 | 80 | μmol/L | 57-111 |

### 结论
肝肾功能各项指标正常

---

## 综合结论

经过全面体检，各项检查结果如下：
1. ✅ 胸部X光：正常
2. ✅ 心电图：正常
3. ✅ 血常规：正常
4. ✅ 尿常规：正常
5. ✅ 肝肾功能：正常

**总体评价**: 本次体检各项指标均在正常范围内，未发现明显异常。

## 健康建议

1. **生活方式**: 保持规律作息，避免熬夜
2. **饮食建议**: 均衡饮食，少油少盐，多吃蔬菜水果
3. **运动建议**: 每周进行3-5次中等强度运动，每次30分钟以上
4. **复查建议**: 建议每年进行一次常规体检

## 体检医师
李医生 主任医师

## 审核医师
王医生 副主任医师

---
*报告日期: 2024-05-01*  
*本报告由OCR系统自动解析生成，整合了5份检查文件*`,
      },
    ];
  }
  // 场景2: 多个文件对应多个报告（系列检查）
  else if (taskId === "multi-files-multi-reports-001") {
    files = task.data.files.map((file, index) => ({
      id: Array.from({ length: 36 }, (_, i) => {
        if (i === 8 || i === 13 || i === 18 || i === 23) return "-";
        return Math.floor(Math.random() * 16).toString(16);
      }).join(""),
      fileName: file.fileName,
      originalFileName: file.fileName,
      contentType: "application/pdf",
      fileSequence: index + 1,
      fileServicePath: `ocr/${task.patientId}/${taskId}/${file.fileName}`,
      reportId: index + 1, // 每个文件对应一个独立报告
      fileUrl: file.fileUrl,
      downloadUrl: `${file.fileUrl}?download=true`,
      previewUrl: `http://localhost:8082/api/v2/ocr/medical-reports/files/${taskId}/preview`,
    }));

    reports = [
      {
        id: 1,
        content: `# CEA（癌胚抗原）检测报告

## 患者信息
- **姓名**: 张三
- **性别**: 男
- **年龄**: 45岁
- **检测日期**: 2024年5月10日

## 检测项目
癌胚抗原（CEA）定量检测

## 检测结果
| 项目 | 结果 | 单位 | 参考范围 | 提示 |
|------|------|------|----------|------|
| CEA | 2.8 | ng/mL | 0-5.0 | 正常 |

## 临床意义
CEA是一种广谱肿瘤标志物，主要用于：
- 结直肠癌的辅助诊断
- 肺癌、胃癌等消化系统肿瘤的监测
- 治疗效果评估和预后判断

## 结论
CEA水平在正常范围内，未见明显异常。

## 检验医师
赵医生

---
*检测时间: 2024-05-10 08:30*  
*报告时间: 2024-05-10 10:00*`,
      },
      {
        id: 2,
        content: `# AFP（甲胎蛋白）检测报告

## 患者信息
- **姓名**: 张三
- **性别**: 男
- **年龄**: 45岁
- **检测日期**: 2024年5月10日

## 检测项目
甲胎蛋白（AFP）定量检测

## 检测结果
| 项目 | 结果 | 单位 | 参考范围 | 提示 |
|------|------|------|----------|------|
| AFP | 3.5 | ng/mL | 0-20.0 | 正常 |

## 临床意义
AFP是肝癌的特异性肿瘤标志物，主要用于：
- 原发性肝癌的辅助诊断
- 生殖细胞肿瘤的监测
- 肝癌治疗效果评估

## 结论
AFP水平在正常范围内，未见明显异常。

## 检验医师
赵医生

---
*检测时间: 2024-05-10 08:30*  
*报告时间: 2024-05-10 10:00*`,
      },
      {
        id: 3,
        content: `# CA19-9（糖类抗原19-9）检测报告

## 患者信息
- **姓名**: 张三
- **性别**: 男
- **年龄**: 45岁
- **检测日期**: 2024年5月10日

## 检测项目
糖类抗原19-9（CA19-9）定量检测

## 检测结果
| 项目 | 结果 | 单位 | 参考范围 | 提示 |
|------|------|------|----------|------|
| CA19-9 | 18.5 | U/mL | 0-37.0 | 正常 |

## 临床意义
CA19-9主要用于：
- 胰腺癌的辅助诊断
- 胆道系统肿瘤的监测
- 结直肠癌、胃癌等消化系统肿瘤的辅助诊断

## 结论
CA19-9水平在正常范围内，未见明显异常。

## 综合评估
三项肿瘤标志物（CEA、AFP、CA19-9）均在正常范围内，未提示肿瘤风险。建议定期复查。

## 检验医师
赵医生

---
*检测时间: 2024-05-10 08:30*  
*报告时间: 2024-05-10 10:00*`,
      },
    ];
  }
  // 场景3: 多页PDF对应一个完整报告
  else if (taskId === "multi-page-pdf-one-report-001") {
    files = [
      {
        id: fileId,
        fileName: task.uploadFileName,
        originalFileName: task.uploadFileName,
        contentType: "application/pdf",
        fileSequence: 1,
        fileServicePath: `ocr/${task.patientId}/${taskId}/${task.uploadFileName}`,
        reportId: 1,
        pageCount: 12,
        fileUrl: task.data.fileUrl,
        downloadUrl: `${task.data.fileUrl}?download=true`,
        previewUrl: `http://localhost:8082/api/v2/ocr/medical-reports/files/${taskId}/preview`,
      },
    ];

    reports = [
      {
        id: 1,
        content: `# 完整体检报告（12页）

## 患者信息
- **姓名**: 张三
- **性别**: 男
- **年龄**: 45岁
- **体检日期**: 2024年6月1日
- **体检编号**: TJ20240601001

*本报告共12页，包含详细的体检项目、检查结果、图片资料和医师建议*

---

## 目录
1. 基本信息与体征测量（第1页）
2. 内科检查（第2页）
3. 外科检查（第3页）
4. 眼科检查（第4页）
5. 耳鼻喉科检查（第5页）
6. 口腔科检查（第6页）
7. 血液检查（第7-8页）
8. 影像学检查（第9-10页）
9. 超声检查（第11页）
10. 综合评估与建议（第12页）

---

## 第1页：基本信息与体征测量

### 基本信息
- 身高: 175 cm
- 体重: 70 kg
- BMI: 22.9（正常范围）
- 血压: 120/80 mmHg
- 心率: 72次/分
- 体温: 36.5°C

---

## 第2-6页：各科检查

### 内科检查
- 心脏：心音有力，心律齐，各瓣膜听诊区未闻及病理性杂音
- 肺部：呼吸音清晰，未闻及干湿性啰音
- 腹部：腹软，无压痛反跳痛，肝脾未触及

### 外科检查
- 皮肤：未见异常皮疹及包块
- 淋巴结：浅表淋巴结未触及肿大
- 脊柱四肢：活动正常，无畸形

### 眼科、耳鼻喉、口腔检查
均未见明显异常

---

## 第7-8页：血液检查详细结果

### 血常规（详细）
[包含20+项指标详细数据]

### 生化全项（详细）
[包含30+项指标详细数据]

---

## 第9-10页：影像学检查

### 胸部X光片
[附影像图片及详细描述]

### 心电图
[附心电图图像及详细分析]

---

## 第11页：超声检查

### 腹部彩超
- 肝脏、胆囊、胰腺、脾脏、双肾：均未见明显异常

---

## 第12页：综合评估与建议

### 体检结论
经过全面系统的体检，您的各项指标基本正常，身体健康状况良好。

### 健康评分
综合健康评分：**92分**（优秀）

### 健康建议
1. 保持现有良好的生活习惯
2. 适度运动，每周3-5次
3. 均衡饮食，控制体重
4. 定期体检，建议每年一次

### 复查建议
建议12个月后进行常规复查

---

## 体检医师签字
主检医师：李医生 主任医师  
审核医师：王医生 副主任医师

*报告日期: 2024-06-01*  
*本报告由OCR系统自动解析生成，完整解析了12页PDF文档*`,
      },
    ];
  }
  // 新增场景：多个文件多个报告的CONFIRMED任务
  else if (
    taskId === "multi-files-reports-001" ||
    taskId === "multi-files-reports-002" ||
    taskId === "multi-files-reports-003" ||
    taskId === "multi-files-reports-004" ||
    taskId === "multi-files-reports-005" ||
    taskId === "multi-files-reports-006"
  ) {
    const reportConfigs = {
      "multi-files-reports-001": {
        files: [
          "血常规检查.pdf",
          "生化全项.pdf",
          "尿常规.pdf",
          "心电图.pdf",
          "胸部X光.pdf",
          "腹部B超.pdf",
          "甲状腺功能.pdf",
          "肿瘤标志物.pdf",
        ],
        reportTitles: [
          "血常规检查报告",
          "生化全项检查报告",
          "尿常规检查报告",
          "心电图检查报告",
          "胸部X光检查报告",
          "腹部B超检查报告",
          "甲状腺功能检查报告",
          "肿瘤标志物检查报告",
        ],
      },
      "multi-files-reports-002": {
        files: [
          "CEA检测.pdf",
          "AFP检测.pdf",
          "CA199检测.pdf",
          "CA125检测.pdf",
          "PSA检测.pdf",
          "NSE检测.pdf",
        ],
        reportTitles: [
          "CEA（癌胚抗原）检测报告",
          "AFP（甲胎蛋白）检测报告",
          "CA19-9肿瘤标志物检测报告",
          "CA125肿瘤标志物检测报告",
          "PSA（前列腺特异抗原）检测报告",
          "NSE（神经元特异性烯醇化酶）检测报告",
        ],
      },
      "multi-files-reports-003": {
        files: [
          "心电图检查.pdf",
          "心脏彩超.pdf",
          "动态心电图.pdf",
          "颈动脉彩超.pdf",
          "血脂全套.pdf",
        ],
        reportTitles: [
          "心电图检查报告",
          "心脏彩超检查报告",
          "24小时动态心电图报告",
          "颈动脉彩超检查报告",
          "血脂全套检查报告",
        ],
      },
      "multi-files-reports-004": {
        files: [
          "甲状腺功能.pdf",
          "甲状腺彩超.pdf",
          "性激素六项.pdf",
          "胰岛素释放试验.pdf",
          "糖化血红蛋白.pdf",
          "皮质醇.pdf",
          "生长激素.pdf",
        ],
        reportTitles: [
          "甲状腺功能检查报告",
          "甲状腺彩超检查报告",
          "性激素六项检查报告",
          "胰岛素释放试验报告",
          "糖化血红蛋白检测报告",
          "皮质醇检测报告",
          "生长激素检测报告",
        ],
      },
      "multi-files-reports-005": {
        files: [
          "胸部CT.pdf",
          "腹部CT.pdf",
          "头颅MRI.pdf",
          "颈椎MRI.pdf",
          "腰椎MRI.pdf",
          "膝关节MRI.pdf",
          "骨密度检测.pdf",
          "乳腺钼靶.pdf",
          "PET-CT.pdf",
        ],
        reportTitles: [
          "胸部CT检查报告",
          "腹部CT检查报告",
          "头颅MRI检查报告",
          "颈椎MRI检查报告",
          "腰椎MRI检查报告",
          "膝关节MRI检查报告",
          "骨密度检测报告",
          "乳腺钼靶检查报告",
          "PET-CT全身扫描报告",
        ],
      },
      "multi-files-reports-006": {
        files: [
          "胃镜检查.pdf",
          "肠镜检查.pdf",
          "幽门螺杆菌.pdf",
          "肝功能.pdf",
          "腹部彩超.pdf",
          "大便常规.pdf",
        ],
        reportTitles: [
          "胃镜检查报告",
          "肠镜检查报告",
          "幽门螺杆菌检测报告",
          "肝功能检查报告",
          "腹部彩超检查报告",
          "大便常规检查报告",
        ],
      },
    };

    const config = reportConfigs[taskId];
    files = config.files.map((fileName, index) => ({
      id: Array.from({ length: 36 }, (_, i) => {
        if (i === 8 || i === 13 || i === 18 || i === 23) return "-";
        return Math.floor(Math.random() * 16).toString(16);
      }).join(""),
      fileName: fileName,
      originalFileName: fileName,
      contentType: "application/pdf",
      fileSequence: index + 1,
      fileServicePath: `ocr/${task.patientId}/${taskId}/${fileName}`,
      reportId: index + 1,
      fileUrl: `http://localhost:8082/files/${taskId}/${fileName}`,
      downloadUrl: `http://localhost:8082/files/${taskId}/${fileName}?download=true`,
      previewUrl: `http://localhost:8082/api/v2/ocr/medical-reports/files/${taskId}/preview`,
    }));

    reports = config.reportTitles.map((title, index) => ({
      id: index + 1,
      content: `# ${title}

## 患者信息
- **姓名**: 张三
- **性别**: 男
- **年龄**: 45岁
- **就诊日期**: 2024年${10 + Math.floor(index / 30)}月${(index % 30) + 1}日
- **检查编号**: ${taskId.toUpperCase()}-${String(index + 1).padStart(3, "0")}

## 检查项目
${title}

## 检查结果

### 主要指标
本次检查共检测 ${5 + index} 项指标，具体结果如下：

| 项目 | 结果 | 单位 | 参考范围 | 提示 |
|------|------|------|----------|------|
| 指标1 | ${(Math.random() * 10 + 50).toFixed(1)} | 单位 | 45-65 | 正常 |
| 指标2 | ${(Math.random() * 10 + 80).toFixed(1)} | 单位 | 75-95 | 正常 |
| 指标3 | ${(Math.random() * 5 + 20).toFixed(1)} | 单位 | 18-28 | 正常 |
| 指标4 | ${(Math.random() * 15 + 100).toFixed(1)} | 单位 | 95-120 | 正常 |

### 检查所见
通过本次检查，观察到以下情况：
1. 各项指标均在正常参考范围内
2. 未发现明显异常表现
3. 整体健康状况良好

## 诊断意见
经检查分析，本次${title}结果显示各项指标正常，未见明显异常。

## 医师建议
1. 保持健康生活方式
2. 定期复查，建议${3 + (index % 6)}个月后复查
3. 如有不适及时就医
4. 注意观察相关症状

## 检查医师
主检医师：李医生 主任医师  
审核医师：王医生 副主任医师

---
*检查日期: 2024年10月${(index % 28) + 1}日*  
*报告日期: 2024年10月${(index % 28) + 2}日*  
*本报告由OCR系统自动解析生成*`,
    }));
  }
  // 默认场景: 单个文件对应单个报告
  else {
    files = [
      {
        id: fileId,
        fileName: task.uploadFileName || "unknown.file",
        originalFileName: task.uploadFileName || "unknown.file",
        contentType: task.uploadFileName?.endsWith(".pdf")
          ? "application/pdf"
          : task.uploadFileName?.endsWith(".png")
          ? "image/png"
          : task.uploadFileName?.endsWith(".jpg") ||
            task.uploadFileName?.endsWith(".jpeg")
          ? "image/jpeg"
          : "application/octet-stream",
        fileSequence: 1,
        fileServicePath: `ocr/${task.patientId}/${taskId}/${
          task.uploadFileName || "unknown.file"
        }`,
        reportId: 1,
        fileUrl: `http://localhost:8082/files/${taskId}/${
          task.uploadFileName || "unknown.file"
        }`,
        downloadUrl: `http://localhost:8082/files/${taskId}/${
          task.uploadFileName || "unknown.file"
        }?download=true`,
        previewUrl: `http://localhost:8082/api/v2/ocr/medical-reports/files/${taskId}/preview`,
      },
    ];

    reports = [
      {
        id: 1,
        content: generateReportContent(task.uploadFileName || ""),
      },
    ];
  }

  // 模拟OCR解析结果 - 更新为新的数据结构
  const mockOcrResult = {
    id: taskId,
    ocrVmId: "0",
    files: files.map((file, index) => {
      // 将最后一个文件标记为DONE，其他为UNDO
      const isDone = index === files.length - 1;
      return {
        id: file.id,
        fileName: file.fileName,
        originalFileName: file.originalFileName,
        contentType: file.contentType,
        fileSequence: file.fileSequence,
        fileServicePath: file.fileServicePath,
        fileStatus: isDone ? "DONE" : "UNDO",
        reportId: isDone ? file.reportId : undefined,
        annotatedFileServicePath: isDone
          ? file.fileServicePath.replace("/ocr/", "/ocr/annotated/")
          : undefined,
        fileUrl: file.fileUrl,
        downloadUrl: file.downloadUrl,
        previewUrl: file.previewUrl,
      };
    }),
    reports: reports.map((report) => {
      // 检查是否有已保存的报告内容
      const savedReport = task.data?.savedReports?.find(
        (r) => r.id === report.id
      );

      if (savedReport) {
        // 如果有已保存的内容，使用保存的内容
        return {
          id: savedReport.id,
          reportStatus: savedReport.reportStatus || "CONFIRMED",
          reportContentMarkdown: savedReport.reportContentMarkdown,
        };
      } else {
        // 否则使用mock生成的内容
        return {
          id: report.id,
          reportStatus: task.taskStatus === "CONFIRMED" ? "CONFIRMED" : "DRAFT",
          reportContentMarkdown: report.content,
        };
      }
    }),
  };

  res.json({
    success: true,
    code: 200,
    result: mockOcrResult,
    timestamp: Date.now(),
  });
});

/**
 * 文件访问接口 - 获取文件内容或下载文件
 */
app.get("/files/:taskId/:fileName", (req, res) => {
  const { taskId, fileName } = req.params;
  const task = ocrTasks.get(taskId);

  if (!task) {
    return res.status(404).json({
      success: false,
      code: 404,
      message: "文件不存在",
      timestamp: Date.now(),
    });
  }

  // 根据文件类型返回不同的内容
  if (fileName.endsWith(".pdf")) {
    // 返回PDF文件的模拟内容（实际应该返回真实的PDF文件流）
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${encodeURIComponent(fileName)}"`
    );
    res.send(Buffer.from("%PDF-1.4 模拟PDF内容"));
  } else if (fileName.endsWith(".png")) {
    // 返回一个1x1透明PNG图片
    res.setHeader("Content-Type", "image/png");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${encodeURIComponent(fileName)}"`
    );
    const transparentPng = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      "base64"
    );
    res.send(transparentPng);
  } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
    // 返回一个1x1白色JPEG图片
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${encodeURIComponent(fileName)}"`
    );
    const whiteJpeg = Buffer.from(
      "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/wA==",
      "base64"
    );
    res.send(whiteJpeg);
  } else {
    // 其他文件类型返回文本
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(fileName)}"`
    );
    res.send("模拟文件内容");
  }
});

/**
 * 文件预览接口 - 返回文件的预览信息
 */
app.get("/api/v2/ocr/medical-reports/files/:taskId/preview", (req, res) => {
  const { taskId } = req.params;
  const task = ocrTasks.get(taskId);

  if (!task) {
    return res.status(404).json({
      success: false,
      code: 404,
      message: "任务不存在",
      timestamp: Date.now(),
    });
  }

  // 返回文件预览信息
  res.json({
    success: true,
    code: 200,
    result: {
      taskId: taskId,
      fileName: task.uploadFileName,
      fileUrl: `http://localhost:8082/files/${taskId}/${task.uploadFileName}`,
      downloadUrl: `http://localhost:8082/files/${taskId}/${task.uploadFileName}?download=true`,
      fileSize: Math.floor(Math.random() * 5000000) + 100000, // 100KB - 5MB
      contentType: task.uploadFileName?.endsWith(".pdf")
        ? "application/pdf"
        : task.uploadFileName?.endsWith(".png")
        ? "image/png"
        : task.uploadFileName?.endsWith(".jpg") ||
          task.uploadFileName?.endsWith(".jpeg")
        ? "image/jpeg"
        : "application/octet-stream",
      uploadTime: task.createdAt,
      thumbnailUrl: `http://localhost:8082/files/${taskId}/${task.uploadFileName}?thumbnail=true`,
    },
    timestamp: Date.now(),
  });
});

/**
 * 批量获取文件预览信息
 */
app.post("/api/v2/ocr/medical-reports/files/preview/batch", (req, res) => {
  const { taskIds } = req.body;

  if (!Array.isArray(taskIds)) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "taskIds必须是数组",
      timestamp: Date.now(),
    });
  }

  const previews = taskIds
    .map((taskId) => {
      const task = ocrTasks.get(taskId);
      if (!task) return null;

      return {
        taskId: taskId,
        fileName: task.uploadFileName,
        fileUrl: `http://localhost:8082/files/${taskId}/${task.uploadFileName}`,
        downloadUrl: `http://localhost:8082/files/${taskId}/${task.uploadFileName}?download=true`,
        fileSize: Math.floor(Math.random() * 5000000) + 100000,
        contentType: task.uploadFileName?.endsWith(".pdf")
          ? "application/pdf"
          : task.uploadFileName?.endsWith(".png")
          ? "image/png"
          : task.uploadFileName?.endsWith(".jpg") ||
            task.uploadFileName?.endsWith(".jpeg")
          ? "image/jpeg"
          : "application/octet-stream",
        uploadTime: task.createdAt,
        thumbnailUrl: `http://localhost:8082/files/${taskId}/${task.uploadFileName}?thumbnail=true`,
      };
    })
    .filter((preview) => preview !== null);

  res.json({
    success: true,
    code: 200,
    result: previews,
    timestamp: Date.now(),
  });
});

/**
 * 获取LLM Timeline数据
 */
app.get("/api/v2/mdt/timeline-slide/:pageId/nodes", (req, res) => {
  const { pageId } = req.params;

  if (!pageId) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "缺少必要参数: pageId",
      timestamp: Date.now(),
    });
  }

  // 模拟Timeline节点数据
  const timelineNodes = [
    {
      id: 1581,
      pageId: pageId,
      eventTypes: "IMAGING_REPORT,DIAGNOSIS",
      nodeType: "LLM_GENERATED",
      startTime: "2021-07-01",
      details:
        "2021-07-01我院内镜超声提示胰管扩张最宽约6mm胰腺未见明显占位性病变肿瘤标志物及MRI未查患者后规律于我院随访, 2021-07-01我院内镜超声提示胰管扩张最宽约6mm胰腺未见明显占位性病变肿瘤标志物及MRI未查患者后规律于我院随访, 患者2021-5体检发现胰管扩张来我院就诊病程中无腹痛腹胀脂肪泄血糖升高等症状为求进一步诊治来我院就诊2021-07-01我院内镜超声提示胰管扩张最宽约6mm胰腺未见明显占位性病变肿瘤标志物及MRI未查患者后规律于我院随访, 2021-07-01我院内镜超声提示胰管扩张最宽约6mm胰腺未见明显占位性病变肿瘤标志物及MRI未查患者后规律于我院随访",
      isHide: false,
      summary: "内镜超声检查发现胰管扩张，未见明显占位性病变",
      summaryType: "TUMOR_INFO",
      attrs: {
        source_link: [
          "http://localhost:8082/api/v2/medical-records/1581/history",
          "http://localhost:8082/api/v2/imaging-reports/1581/endoscopy",
        ],
      },
      insights: [
        {
          id: 3623,
          insightType: "TUMOR_INFO",
          summary: "报告名称=内镜超声",
          attrs: {
            source_link: ["现病史"],
          },
        },
        {
          id: 3624,
          insightType: "TUMOR_INFO",
          summary: "诊断结果=胰管扩张",
          attrs: {
            source_link: ["现病史"],
          },
        },
        {
          id: 3625,
          insightType: "ABNORMAL_METRICS",
          summary: "未查",
          attrs: {
            source_link: ["现病史"],
          },
        },
      ],
    },
    {
      id: 1582,
      pageId: pageId,
      eventTypes: "IMAGING_REPORT",
      nodeType: "LLM_GENERATED",
      startTime: "2021-10-11",
      details:
        "2021-10-11腹部MRI胰腺IPMN主胰管型, 2021-10-11腹部MRI胰腺IPMN主胰管型, 2021-10-11腹部MRI胰腺IPMN主胰管型, 2021-10-11腹部MRI胰腺IPMN主胰管型",
      isHide: false,
      summary: "腹部MRI确诊胰腺IPMN（主胰管型）",
      summaryType: "TUMOR_INFO",
      attrs: {
        source_link: [
          "http://localhost:8082/api/v2/medical-records/1582/history",
          "http://localhost:8082/api/v2/imaging-reports/1582/mri-abdomen",
        ],
      },
      insights: [
        {
          id: 3626,
          insightType: "TUMOR_INFO",
          summary: "报告名称=腹部MRI",
          attrs: {
            source_link: ["现病史"],
          },
        },
        {
          id: 3627,
          insightType: "TUMOR_INFO",
          summary: "诊断结果=胰腺IPMN（主胰管型）",
          attrs: {
            source_link: ["现病史"],
          },
        },
      ],
    },
    {
      id: 1583,
      pageId: pageId,
      eventTypes: "IMAGING_REPORT",
      nodeType: "LLM_GENERATED",
      startTime: "2022-09-15",
      details:
        "2022-09-15内镜超声主胰管扩张IPMN可能, MPD为6.8mm胰腺实质内未见明显占位肿瘤标志物, 2022-09-15内镜超声主胰管扩张IPMN可能, MPD为6.8mm胰腺实质内未见明显占位肿瘤标志物, 2022-09-15内镜超声主胰管扩张IPMN可能, MPD为6.8mm胰腺实质内未见明显占位肿瘤标志物, 2022-09-15内镜超声主胰管扩张IPMN可能, MPD为6.8mm胰腺实质内未见明显占位肿瘤标志物",
      isHide: false,
      summary: "随访内镜超声显示主胰管扩张至6.8mm，IPMN可能",
      summaryType: "TUMOR_INFO",
      attrs: {
        source_link: [
          "http://localhost:8082/api/v2/imaging-reports/1583/endoscopy-followup",
          "http://localhost:8082/api/v2/medical-records/1583/followup-notes",
        ],
      },
      insights: [
        {
          id: 3628,
          insightType: "TUMOR_INFO",
          summary: "报告名称=内镜超声",
          attrs: {
            source_link: ["现病史"],
          },
        },
      ],
    },
    {
      id: 1584,
      pageId: pageId,
      eventTypes: "OTHER",
      nodeType: "LLM_GENERATED",
      startTime: "2022-09-28",
      details:
        "2022-09-28CA 19-9 12.86 U/ml 患者2021-5体检发现胰管扩张来我院就诊病程中无腹痛腹胀脂肪泄血糖升高等症状为求进一步诊治来我院就诊, 2022-09-28CA 19-9 12.86 U/ml 既往无胰腺炎发作病史 既往无胰腺炎发作病史 既往无胰腺炎发作病史 既往无胰腺炎发作病史, 2022-09-28CA 19-9 12.86 U/ml 患者2021-5体检发现胰管扩张来我院就诊病程中无腹痛腹胀脂肪泄血糖升高等症状为求进一步诊治来我院就诊, 2022-09-28CA 19-9 12.86 U/ml 患者2021-5体检发现胰管扩张来我院就诊病程中无腹痛腹胀脂肪泄血糖升高等症状为求进一步诊治来我院就诊",
      isHide: false,
      summary: "肿瘤标志物CA19-9检测结果正常",
      summaryType: "TUMOR_MARKERS",
      attrs: {
        source_link: [
          "http://localhost:8082/api/v2/lab-reports/1584/tumor-markers",
        ],
      },
      insights: [
        {
          id: 3629,
          insightType: "ABNORMAL_METRICS",
          summary: "CA19-912.86U/ml",
        },
      ],
    },
    {
      id: 1585,
      pageId: pageId,
      eventTypes: "PATHOLOGY_REPORT",
      nodeType: "LLM_GENERATED",
      startTime: "2025-07-14",
      details: "左肺肿物活检:肺结合免疫组化结果考虑恶性肿瘤倾向为粘液腺癌",
      isHide: false,
      summary: "左肺肿物病理确诊为恶性肿瘤，倾向粘液腺癌",
      summaryType: "TUMOR_INFO",
      attrs: {
        source_link: [
          "http://172.56.43.213/image001.jpg",
          "http://localhost:8082/api/v2/pathology-reports/1585",
        ],
      },
      insights: [
        {
          id: 3630,
          insightType: "TUMOR_INFO",
          summary: "诊断结果=恶性肿瘤，倾向为粘液腺癌",
          attrs: {
            source_link: ["http://172.56.43.213/image001.jpg"],
          },
        },
      ],
    },
    {
      id: 1586,
      pageId: pageId,
      eventTypes: "IMAGING_REPORT",
      nodeType: "LLM_GENERATED",
      startTime: "2025-08-12",
      details:
        "CT:颈椎生理曲度存在后缘序列连续颈椎椎体及附件骨质未见明显异常诸颈椎间盘T2WI信号尚可C3/4-C5/6椎间盘可见轻度向后突出征局部硬膜囊前缘受压颈椎骨性椎管未见明显狭窄C2-4水平颈髓中央及右侧份见小斑片状稍长T2信号影边缘欠清余颈髓形态信号未见明显异常黄韧带未见明显增厚 双侧放射冠及半卵圆中心双侧额顶叶双侧侧脑室后角旁见斑点状小斑片略长T1略长T2信号灶DWI呈稍高信号部分病灶与侧脑室垂直改变余脑实质内未见局灶性信号异常幕下小脑脑干未见异常信号脑室系统未见扩张脑沟脑裂未见增宽中线结构居中筛窦及右上颌窦见长T2信号 胸椎生理曲度存在后缘序列连续各胸椎体骨质信号未见明显异常各附件骨质未见明显异常诸胸椎间盘形态及信号未见明显异常胸段脊髓形态大小及信号未见明显异常None, B超:肝脏增大表面光整肝内见弥漫性大小不等类圆形低密度影平扫边界不清静脉注射35%碘佛醇100ml增强扫描肝脏低密度影明显强化较肝实质呈相对低密度边界变清楚较大病灶约20mm直径肝内少量小片极高密度影边界清楚肝血管局部受压变形狭窄肝内外胆管未见异常扩张胆囊不大周围见少量水样密度影环绕胰腺脾脏形态密度未见异常胃及上腹部肠道未见异常扩张积液两侧肾上腺及肾脏形态密度未见异常腹膜后未见增大淋巴结影腹腔未见明显积液1.肝脏弥漫性低密度灶考虑转移性肿瘤可能较大2. 肝钙化灶",
      isHide: false,
      summary: "CT和B超检查提示肝脏弥漫性转移性肿瘤，最大病灶约20mm",
      summaryType: "TUMOR_INFO",
      attrs: {
        source_link: [
          "https://radiopaedia.org/cases/6871/studies/8021?lang=us",
          "http://localhost:8082/api/v2/imaging-reports/1586/ct",
          "http://localhost:8082/api/v2/imaging-reports/1586/ultrasound",
        ],
      },
      insights: [
        {
          id: 3631,
          insightType: "TUMOR_INFO",
          summary: "报告名称=CT",
          attrs: {
            source_link: [
              "https://radiopaedia.org/cases/6871/studies/8021?lang=us",
            ],
          },
        },
        {
          id: 3632,
          insightType: "TUMOR_INFO",
          summary: "诊断结果=颈椎间盘轻度向后突出",
          attrs: {
            source_link: [
              "https://radiopaedia.org/cases/6871/studies/8021?lang=us",
            ],
          },
        },
        {
          id: 3633,
          insightType: "TUMOR_INFO",
          summary: "报告名称=B超",
        },
        {
          id: 3634,
          insightType: "TUMOR_INFO",
          summary: "肿瘤数量=弥漫性",
        },
        {
          id: 3635,
          insightType: "TUMOR_INFO",
          summary: "肿瘤最大径=20mm",
        },
        {
          id: 3636,
          insightType: "TUMOR_INFO",
          summary: "转移情况=考虑转移性肿瘤可能较大",
        },
        {
          id: 3637,
          insightType: "TUMOR_INFO",
          summary: "浸润情况=肝血管局部受压变形狭窄",
        },
      ],
    },
    {
      id: 1587,
      pageId: pageId,
      eventTypes: "IMAGING_REPORT,TREATMENT,OTHER",
      nodeType: "LLM_GENERATED",
      startTime: "2025-09-08",
      details:
        "甲胎蛋白:Noneng/mL, 外科手术50.2200部分肝切除术, 肝病损或组织的直视消融术治疗记录, 肝脏硬度扫描:肝脏形态尚可表面略呈波浪状肝S4段及S8段各见一不规则稍低密度影边界欠清晰最大者位于S4段大小约7.59.26.0cm动态增强扫描动脉期呈不均匀强化门脉期及延迟期强化减退内部可见斑片状无强化坏死区另于S8段见一大小约3.22.8cm类圆形低密度灶增强后边缘环形强化肝门区见数枚肿大淋巴结较大者长径约2.5cm增强后呈轻度强化考虑局部淋巴结转移门静脉主干内可见充盈缺损长度约4.5cm考虑门静脉癌栓形成肝内外胆管轻度扩张肝总管管壁增厚管腔内见软组织密度影填充提示肝总管癌栓可能胆囊体积增大壁弥漫性增厚伴黏膜层强化胰腺形态正常脾脏体积增大肋下3指双肺下叶见多发散在结节影较大者直径约1.5cm边缘模糊疑肺转移灶胸椎T12椎体见溶骨性破坏区范围约2.01.8cm周围软组织肿胀增强后呈不均匀强化考虑骨转移脑实质内未见明显异常密度影双肾见多发小圆形低密度灶最大直径约1.2cm增强后未见明显强化腹膜后未见明显肿大淋巴结肝包膜下见少量液性密度影邻近肝实质局部轮廓不连续周围见斑片状高密度出血灶考虑肿瘤破裂伴包膜下出血None, 支气管镜:支气管镜检查结果显示患者右侧主支气管及部分叶支气管黏膜充血右下叶支气管发现一约2cm的肿块右上叶支气管小结节状隆起需进一步观察建议患者进行肿块的组织活检及病理检查以确定肿块的性质同时肺泡灌洗液已送病理实验室检测结果待定根据检查结果建议患者进行进一步的治疗例如抗炎治疗或外科处理, 异常凝血酶原:15.6ng/mL, 异常凝血酶原:Noneng/mL, 甲胎蛋白异质体:None%, 甲胎蛋白:6.7ng/mL",
      isHide: false,
      summary:
        "多处转移病灶（肝门淋巴结、门静脉癌栓、肺转移、骨转移），实施部分肝切除术和消融治疗",
      summaryType: "TREATMENT",
      attrs: {
        source_link: [
          "https://prod-images-static.radiopaedia.org/images/29058/c3e2353c3631c1356ec87bb9f31e2a_big_gallery.jpg",
          "http://localhost:8082/api/v2/surgery-records/1587",
          "http://localhost:8082/api/v2/imaging-reports/1587",
          "http://localhost:8082/api/v2/lab-reports/1587",
        ],
      },
      insights: [
        {
          id: 3638,
          insightType: "TUMOR_INFO",
          summary: "报告名称=肝脏硬度扫描",
          attrs: {
            source_link: [
              "https://prod-images-static.radiopaedia.org/images/29058/c3e2353c3631c1356ec87bb9f31e2a_big_gallery.jpg",
            ],
          },
        },
        {
          id: 3639,
          insightType: "TUMOR_INFO",
          summary: "肿瘤数量=2",
          attrs: {
            source_link: [
              "https://prod-images-static.radiopaedia.org/images/29058/c3e2353c3631c1356ec87bb9f31e2a_big_gallery.jpg",
            ],
          },
        },
        {
          id: 3640,
          insightType: "TUMOR_INFO",
          summary: "肿瘤最大径=9.2cm",
          attrs: {
            source_link: [
              "https://prod-images-static.radiopaedia.org/images/29058/c3e2353c3631c1356ec87bb9f31e2a_big_gallery.jpg",
            ],
          },
        },
        {
          id: 3641,
          insightType: "TUMOR_INFO",
          summary:
            "转移情况=肝门区淋巴结转移,门静脉癌栓形成,肝总管癌栓可能,肺转移,骨转移",
          attrs: {
            source_link: [
              "https://prod-images-static.radiopaedia.org/images/29058/c3e2353c3631c1356ec87bb9f31e2a_big_gallery.jpg",
            ],
          },
        },
        {
          id: 3642,
          insightType: "TUMOR_INFO",
          summary: "浸润情况=肿瘤破裂伴包膜下出血",
          attrs: {
            source_link: [
              "https://prod-images-static.radiopaedia.org/images/29058/c3e2353c3631c1356ec87bb9f31e2a_big_gallery.jpg",
            ],
          },
        },
        {
          id: 3643,
          insightType: "TUMOR_INFO",
          summary:
            "诊断结果=右下叶支气管发现一约2cm的肿块，右上叶支气管小结节状隆起",
          attrs: {
            source_link: ["影像报告"],
          },
        },
        {
          id: 3644,
          insightType: "TREATMENT_DETAILS",
          summary: "部分肝切除术",
          attrs: {
            source_link: ["外科手术"],
          },
        },
        {
          id: 3645,
          insightType: "TREATMENT_DETAILS",
          summary: "直视消融术",
          attrs: {
            source_link: ["肝病损或组织的直视消融术"],
          },
        },
        {
          id: 3646,
          insightType: "ABNORMAL_METRICS",
          summary: "甲胎蛋白Noneng/mL",
        },
        {
          id: 3647,
          insightType: "ABNORMAL_METRICS",
          summary: "异常凝血酶原15.6ng/mL",
        },
        {
          id: 3648,
          insightType: "ABNORMAL_METRICS",
          summary: "异常凝血酶原Noneng/mL",
        },
        {
          id: 3649,
          insightType: "ABNORMAL_METRICS",
          summary: "甲胎蛋白异质体None",
        },
        {
          id: 3650,
          insightType: "ABNORMAL_METRICS",
          summary: "AFP6.7ng/mL",
        },
      ],
    },
    {
      id: 1588,
      pageId: pageId,
      eventTypes: "TREATMENT,OTHER",
      nodeType: "LLM_GENERATED",
      startTime: "2025-09-09",
      details:
        "介入治疗 介入治疗方式TACE 肝癌动脉灌注化疗栓塞治疗 介入治疗名称88.4701 肝动脉造影 介入治疗用药表柔比星 已完成介入疗程数1 栓塞药物明胶海绵颗粒 载药微球是 精细TACE是, 放射治疗短程放射性核素治疗的液体输注",
      isHide: false,
      summary: "TACE肝癌动脉灌注化疗栓塞治疗，使用表柔比星",
      summaryType: "TREATMENT",
      attrs: {
        source_link: [
          "http://localhost:8082/api/v2/treatment-records/1588/intervention-tace",
          "http://localhost:8082/api/v2/treatment-records/1588/radiation-therapy",
        ],
      },
      insights: [
        {
          id: 3651,
          insightType: "TREATMENT_DETAILS",
          summary: "TACE肝癌动脉灌注化疗栓塞治疗",
          attrs: {
            source_link: ["放射治疗"],
          },
        },
        {
          id: 3652,
          insightType: "TREATMENT_DETAILS",
          summary: "短程放射性核素治疗",
        },
      ],
    },
    {
      id: 1589,
      pageId: pageId,
      eventTypes: "TREATMENT",
      nodeType: "LLM_GENERATED",
      startTime: "2025-09-10",
      details:
        "消融治疗50.2302 肝病损射频消融术, 系统治疗 治疗方案: 斯鲁利单抗,派安普利单抗  免疫治疗 派安普利单抗 单次剂量: 200.0 剂量单位: mg 用药频次: 1 周期: 1 周期单位: 天 已完成周期数: 0 计划周期数: 0;  免疫治疗 斯鲁利单抗 开始用药时间: 2025-09-10 首次用药时间: 2025-09-10 单次剂量: 3.0 剂量单位: mg/kg 用药频次: 1 周期: 1 周期单位: 天 已完成周期数: 0 计划周期数: 0; ",
      isHide: false,
      summary: "肝病损射频消融术，联合免疫治疗（斯鲁利单抗+派安普利单抗）",
      summaryType: "TREATMENT",
      attrs: {
        source_link: [
          "http://localhost:8082/api/v2/treatment-records/1589/ablation-therapy",
          "http://localhost:8082/api/v2/treatment-records/1589/immunotherapy",
        ],
      },
      insights: [
        {
          id: 3653,
          insightType: "TREATMENT_DETAILS",
          summary: "肝病损射频消融术",
          attrs: {
            source_link: ["消融治疗"],
          },
        },
        {
          id: 3654,
          insightType: "TREATMENT_DETAILS",
          summary: "斯鲁利单抗,派安普利单抗",
          attrs: {
            source_link: ["系统治疗"],
          },
        },
      ],
    },
    {
      id: 1590,
      pageId: pageId,
      eventTypes: "TREATMENT",
      nodeType: "LLM_GENERATED",
      startTime: "2025-10-11",
      details:
        "系统治疗 治疗方案: 斯鲁利单抗  免疫治疗 斯鲁利单抗 开始用药时间: 2025-10-11 单次剂量: 3.0 剂量单位: mg/kg 用药频次: 1 周期: 1 周期单位: 天 计划周期数: 1 周期一 开始用药时间: 2025-10-11 结束用药时间: 2025-10-12 单次剂量: 3.0 剂量单位: mg/kg 用药频次1次/每 周期: 1 周期单位: 天; ",
      isHide: false,
      summary: "继续免疫治疗斯鲁利单抗，第一周期",
      summaryType: "TREATMENT",
      attrs: {
        source_link: [
          "http://localhost:8082/api/v2/treatment-records/1590/immunotherapy-cycle1",
        ],
      },
      insights: [
        {
          id: 3655,
          insightType: "TREATMENT_DETAILS",
          summary: "斯鲁利单抗",
        },
      ],
    },
    {
      id: 1591,
      pageId: pageId,
      eventTypes: "IMAGING_REPORT,PATHOLOGY_REPORT,TREATMENT",
      nodeType: "MANUAL_CREATED",
      startTime: "2025-11-26",
      details: "",
      isHide: false,
      summary: "手动创建的综合节点",
      summaryType: "TUMOR_INFO",
      attrs: {
        source_link: [
          "http://localhost:8082/api/v2/manual-entries/1591/combined-node",
        ],
      },
      insights: [
        {
          id: 3656,
          insightType: "TREATMENT_DETAILS",
          summary: "治疗",
        },
        {
          id: 3657,
          insightType: "TUMOR_INFO",
          summary: "肿瘤信息",
        },
        {
          id: 3658,
          insightType: "ABNORMAL_METRICS",
          summary: "肿瘤标志物",
        },
      ],
    },
    {
      id: 1592,
      pageId: pageId,
      eventTypes: "IMAGING_REPORT",
      nodeType: "LLM_GENERATED",
      startTime: "2025-11-15",
      details:
        "增强CT显示肝脏S4段和S8段肿瘤较前明显缩小，S4段病灶由9.2cm缩小至6.5cm，S8段病灶由3.2cm缩小至1.8cm，门静脉癌栓较前缩小，肺部转移灶部分消失，骨转移病灶稳定",
      isHide: false,
      summary: "治疗后评估：肝脏肿瘤明显缩小，部分转移灶消失",
      summaryType: "TUMOR_INFO",
      attrs: {
        source_link: [
          "http://localhost:8082/api/v2/imaging-reports/1592/ct-followup",
          "http://localhost:8082/api/v2/treatment-records/1592/response-evaluation",
        ],
      },
      insights: [
        {
          id: 3659,
          insightType: "TUMOR_INFO",
          summary: "报告名称=增强CT",
          attrs: {
            source_link: [
              "http://localhost:8082/api/v2/imaging-reports/1592/ct-followup",
            ],
          },
        },
        {
          id: 3660,
          insightType: "TUMOR_INFO",
          summary: "肿瘤最大径=6.5cm（较前缩小）",
          attrs: {
            source_link: [
              "http://localhost:8082/api/v2/imaging-reports/1592/ct-followup",
            ],
          },
        },
        {
          id: 3661,
          insightType: "TUMOR_INFO",
          summary: "疗效评价=部分缓解（PR）",
        },
      ],
    },
    {
      id: 1593,
      pageId: pageId,
      eventTypes: "OTHER",
      nodeType: "LLM_GENERATED",
      startTime: "2025-11-16",
      details:
        "甲胎蛋白（AFP）: 3.2 ng/mL, CA19-9: 18.5 U/ml, CEA: 2.8 ng/mL, 异常凝血酶原: 8.2 ng/mL",
      isHide: false,
      summary: "肿瘤标志物检测：各项指标均明显下降",
      summaryType: "TUMOR_MARKERS",
      attrs: {
        source_link: [
          "http://localhost:8082/api/v2/lab-reports/1593/tumor-markers-followup",
        ],
      },
      insights: [
        {
          id: 3662,
          insightType: "ABNORMAL_METRICS",
          summary: "AFP3.2ng/mL（较前下降）",
        },
        {
          id: 3663,
          insightType: "ABNORMAL_METRICS",
          summary: "CA19-918.5U/ml（正常范围）",
        },
        {
          id: 3664,
          insightType: "ABNORMAL_METRICS",
          summary: "CEA2.8ng/mL（正常范围）",
        },
        {
          id: 3665,
          insightType: "ABNORMAL_METRICS",
          summary: "异常凝血酶原8.2ng/mL（较前下降）",
        },
      ],
    },
    {
      id: 1594,
      pageId: pageId,
      eventTypes: "TREATMENT",
      nodeType: "LLM_GENERATED",
      startTime: "2025-11-20",
      details:
        "系统治疗 治疗方案: 斯鲁利单抗+派安普利单抗  免疫治疗 斯鲁利单抗 开始用药时间: 2025-11-20 单次剂量: 3.0 剂量单位: mg/kg 用药频次: 1 周期: 21 周期单位: 天 第二周期;  免疫治疗 派安普利单抗 开始用药时间: 2025-11-20 单次剂量: 200.0 剂量单位: mg 用药频次: 1 周期: 21 周期单位: 天 第二周期",
      isHide: false,
      summary: "继续双免疫治疗方案，第二周期",
      summaryType: "TREATMENT",
      attrs: {
        source_link: [
          "http://localhost:8082/api/v2/treatment-records/1594/immunotherapy-cycle2",
        ],
      },
      insights: [
        {
          id: 3666,
          insightType: "TREATMENT_DETAILS",
          summary: "斯鲁利单抗3.0mg/kg+派安普利单抗200mg",
          attrs: {
            source_link: [
              "http://localhost:8082/api/v2/treatment-records/1594/immunotherapy-cycle2",
            ],
          },
        },
      ],
    },
    {
      id: 1595,
      pageId: pageId,
      eventTypes: "OTHER",
      nodeType: "LLM_GENERATED",
      startTime: "2025-11-22",
      details:
        "患者出现轻度皮疹，分布于躯干和四肢，伴轻度瘙痒，无发热，考虑免疫相关不良反应（irAE）1级，予以口服抗组胺药物治疗，密切观察",
      isHide: false,
      summary: "免疫治疗相关皮疹（irAE 1级）",
      summaryType: "ADVERSE_REACTION",
      attrs: {
        source_link: [
          "http://localhost:8082/api/v2/adverse-events/1595/immune-rash",
          "http://localhost:8082/api/v2/treatment-records/1595/adverse-reaction-management",
        ],
      },
      insights: [
        {
          id: 3667,
          insightType: "ADVERSE_REACTION",
          summary: "免疫相关皮疹，1级",
          attrs: {
            source_link: [
              "http://localhost:8082/api/v2/adverse-events/1595/immune-rash",
            ],
          },
        },
        {
          id: 3668,
          insightType: "TREATMENT_DETAILS",
          summary: "口服抗组胺药物对症治疗",
        },
      ],
    },
    {
      id: 1596,
      pageId: pageId,
      eventTypes: "IMAGING_REPORT",
      nodeType: "LLM_GENERATED",
      startTime: "2023-03-20",
      details:
        "PET-CT全身显像：肝脏S4段和S8段病灶代谢活性增高，SUVmax分别为8.2和6.5，肝门区淋巴结代谢活性增高SUVmax 5.8，肺部多发小结节代谢未见异常增高，骨转移灶代谢轻度增高",
      isHide: false,
      summary: "PET-CT评估：肝脏及淋巴结转移灶代谢活跃",
      summaryType: "TUMOR_INFO",
      attrs: {
        source_link: [
          "http://localhost:8082/api/v2/imaging-reports/1596/pet-ct",
          "http://localhost:8082/api/v2/nuclear-medicine/1596/metabolic-assessment",
        ],
      },
      insights: [
        {
          id: 3669,
          insightType: "TUMOR_INFO",
          summary: "报告名称=PET-CT",
          attrs: {
            source_link: [
              "http://localhost:8082/api/v2/imaging-reports/1596/pet-ct",
            ],
          },
        },
        {
          id: 3670,
          insightType: "TUMOR_INFO",
          summary: "代谢活性=SUVmax 8.2（高代谢）",
        },
        {
          id: 3671,
          insightType: "TUMOR_INFO",
          summary: "转移情况=肝门区淋巴结转移活跃",
        },
      ],
    },
    {
      id: 1597,
      pageId: pageId,
      eventTypes: "TREATMENT",
      nodeType: "LLM_GENERATED",
      startTime: "2023-05-10",
      details:
        "靶向治疗 治疗方案: 仑伐替尼  靶向治疗药物 仑伐替尼 开始用药时间: 2023-05-10 单次剂量: 8.0 剂量单位: mg 用药频次: 每日一次 口服 已完成周期数: 6 计划周期数: 持续治疗至疾病进展或不可耐受毒性",
      isHide: false,
      summary: "启动靶向治疗：仑伐替尼8mg每日口服",
      summaryType: "TREATMENT",
      attrs: {
        source_link: [
          "http://localhost:8082/api/v2/treatment-records/1597/targeted-therapy",
        ],
      },
      insights: [
        {
          id: 3672,
          insightType: "TREATMENT_DETAILS",
          summary: "仑伐替尼8mg qd po",
          attrs: {
            source_link: [
              "http://localhost:8082/api/v2/treatment-records/1597/targeted-therapy",
            ],
          },
        },
      ],
    },
    {
      id: 1598,
      pageId: pageId,
      eventTypes: "OTHER",
      nodeType: "LLM_GENERATED",
      startTime: "2023-06-15",
      details:
        "患者出现高血压（收缩压160/95mmHg），轻度蛋白尿（++），手足皮肤反应2级，考虑仑伐替尼相关不良反应，予以降压治疗，剂量调整为6mg qd",
      isHide: false,
      summary: "靶向治疗不良反应：高血压、蛋白尿、手足皮肤反应",
      summaryType: "ADVERSE_REACTION",
      attrs: {
        source_link: [
          "http://localhost:8082/api/v2/adverse-events/1598/lenvatinib-toxicity",
        ],
      },
      insights: [
        {
          id: 3673,
          insightType: "ADVERSE_REACTION",
          summary: "高血压（160/95mmHg）",
        },
        {
          id: 3674,
          insightType: "ADVERSE_REACTION",
          summary: "蛋白尿（++）",
        },
        {
          id: 3675,
          insightType: "ADVERSE_REACTION",
          summary: "手足皮肤反应2级",
        },
        {
          id: 3676,
          insightType: "TREATMENT_DETAILS",
          summary: "剂量调整为6mg qd",
        },
      ],
    },
  ];

  res.json({
    success: true,
    code: 200,
    result: timelineNodes,
    timestamp: Date.now(),
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    success: false,
    code: 404,
    message: "未找到路由",
    timestamp: Date.now(),
  });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    code: 500,
    message: "服务器内部错误",
    timestamp: Date.now(),
  });
});

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
