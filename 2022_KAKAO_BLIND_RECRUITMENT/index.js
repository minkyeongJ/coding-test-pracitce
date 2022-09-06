function solution(id_list, report, k) {
  let answer = []; // 이용자 별 신고 결과가 전달 될 횟수, 순서는 회원리스트 순서로
  const idList = id_list; // 회원 리스트
  let reportData = []; // 신고 데이터
  let reportedId = []; // 유저별 신고당한 횟수
  idList.map((userId) => {
    reportedId = [
      ...reportedId,
      {
        userId: userId,
        reportedCount: 0,
      },
    ];
  });
  const reportedLimmitNum = k; // 정지 기준이 되는 신고 횟수
  let stoppedId = []; // 정지된 아이디
  let alretList = []; // 보고 해야 할 아이디
  idList.map((userId) => {
    alretList = [
      ...alretList,
      {
        userId: userId,
        stoppedId: [],
      },
    ];
  });

  // 1. report를 reportData에 신고자 중복체크하여 저장
  // report의 형식은 ["신고자 피신고자","신고자 피신고자"]
  // reportData에 저장 될 형식은 [{userId: "유저 ID", reportId: "유저가 신고한 ID"}]

  // 1-1) 중복 제거
  const set = new Set(report);
  const uniqueReport = [...set];

  // 1-2) 신고된 데이터 분리
  uniqueReport.map((report) => {
    reportData = [
      ...reportData,
      { userId: report.split(" ")[0], reportedId: report.split(" ")[1] },
    ];
  });

  // 1-3) 신고 당한 횟수 체크
  reportData.map((reportData) => {
    const reportDataReportedId = reportData.reportedId;
    reportedId.map((userId) => {
      const reportedIdUserId = userId.userId;
      if (reportDataReportedId == reportedIdUserId) {
        userId.reportedCount += 1;
      }
    });
  });
  console.log(reportData);
  console.log(reportedId);

  // 2. 신고 당한 횟수가 reportedLimmitNum 이상인 아이디 찾고 등록하기
  // 2-1) 아이디 찾기
  reportedId.map((reportedId) => {
    if (reportedId.reportedCount >= reportedLimmitNum) {
      stoppedId = [...stoppedId, reportedId.userId];
    }
  });
  console.log(stoppedId);
  // 2-2) 아이디 등록하기
  stoppedId.map((stoppedId) => {
    reportData.map((reportData) => {
      if (reportData.reportedId == stoppedId) {
        alretList.map((alretList) => {
          if (alretList.userId == reportData.userId) {
            alretList.stoppedId = [...alretList.stoppedId, stoppedId];
          }
        });
      }
    });
  });
  console.log(alretList);

  // 3. 신고 당한 횟수가 reportedLimmitNum 이상인 아이디를 신고한 사람의 answer에 count올리기
  alretList.map((alertList, i) => (answer[i] = alertList.stoppedId.length));

  return answer;
}
