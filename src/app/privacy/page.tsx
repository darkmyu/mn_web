export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 text-zinc-900 dark:text-zinc-50">
      <h1 className="mb-6 text-2xl font-bold">개인정보처리방침</h1>
      <div className="flex flex-col gap-8 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        <section>
          <p>
            몽냥(이하 &quot;회사&quot;)은 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관련 법령에
            따라 이용자의 개인정보를 보호하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과
            같이 개인정보처리방침을 수립·공개합니다.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">제1조 (개인정보의 처리 목적)</h2>
          <p className="mb-2">
            회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
            이용되지 않으며, 이용 목적이 변경되는 경우에는 관련 법령에 따라 별도의 동의를 받는 등 필요한 조치를 이행할
            예정입니다.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">회원 가입 및 관리</span>: 회원제 서비스
              이용에 따른 본인확인, 개인 식별, 가입 의사 확인, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 및
              가입횟수 제한, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달
            </li>
            <li>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">서비스 제공</span>: 서비스 제공에 관한
              계약 이행, 콘텐츠 제공, 맞춤 서비스 제공
            </li>
            <li>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">신규 서비스 개발 및 마케팅</span>: 신규
              서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공, 서비스의 유효성 확인,
              접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계
            </li>
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            제2조 (개인정보의 수집 항목 및 방법)
          </h2>
          <p className="mb-2">회사는 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">수집항목</span>: 이메일, 비밀번호, 닉네임,
              프로필 사진, 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보
            </li>
            <li>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">수집방법</span>: 홈페이지(회원가입),
              제휴사로부터의 제공, 생성정보 수집 툴을 통한 수집
            </li>
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            제3조 (개인정보의 처리 및 보유기간)
          </h2>
          <p className="mb-2">
            회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보
            보유·이용기간 내에서 개인정보를 처리·보유합니다.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">회원 가입 및 관리</span>: 회원 탈퇴
              시까지. 다만, 관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는 해당 수사·조사 종료 시까지
            </li>
            <li>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">재화 또는 서비스 제공</span>: 재화·서비스
              공급완료 및 요금결제·정산 완료 시까지
            </li>
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            제4조 (개인정보의 파기절차 및 방법)
          </h2>
          <p className="mb-2">
            회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기절차 및
            방법은 다음과 같습니다.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">파기절차</span>: 회원이 회원가입 등을 위해
              입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에
              의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된 후 파기됩니다.
            </li>
            <li>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">파기방법</span>: 전자적 파일 형태로 저장된
              개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            제5조 (이용자 및 법정대리인의 권리와 그 행사방법)
          </h2>
          <p className="mb-2">
            이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수 있습니다.
            이용자의 개인정보 조회/수정을 위해서는 ‘개인정보변경’(또는 ‘회원정보수정’ 등)을, 가입해지(동의철회)를
            위해서는 “회원탈퇴”를 클릭하여 본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            제6조 (개인정보의 안전성 확보조치)
          </h2>
          <p className="mb-2">회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>관리적 조치 : 내부관리계획 수립·시행, 정기적 직원 교육 등</li>
            <li>
              기술적 조치 : 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화,
              보안프로그램 설치
            </li>
            <li>물리적 조치 : 전산실, 자료보관실 등의 접근통제</li>
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">제7조 (개인정보 보호책임자)</h2>
          <p className="mb-2">
            회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제
            등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
            <ul className="space-y-1 text-sm">
              <li>
                <span className="font-semibold">이름</span>: 민병준
              </li>
              <li>
                <span className="font-semibold">직위</span>: 개인정보 보호책임자
              </li>
              <li>
                <span className="font-semibold">이메일</span>: bammyu.dev@gmail.com
              </li>
            </ul>
          </div>
        </section>
        <section className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <p className="text-xs text-zinc-500">본 개인정보처리방침은 2026년 2월 20일부터 적용됩니다.</p>
        </section>
      </div>
    </div>
  );
}
